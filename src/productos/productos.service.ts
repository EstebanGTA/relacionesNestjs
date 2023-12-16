/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { ModeloEntity } from './entities/modelo.entity';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
    @InjectRepository(ModeloEntity)
    private readonly modeloRepository: Repository<ModeloEntity>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const { productos_modelo = [], ...modeloDetalle } = createProductoDto

      const product = this.productoRepository.create(
        {
          ...modeloDetalle,
          productos_modelo: productos_modelo.map( producto_modelo => this.modeloRepository.create({ nombre: producto_modelo }))
        }
      );
      await this.productoRepository.save(product);
      return { ...product, productos_modelo }
    }
    catch (error) {
      console.log(error)
      throw new Error('No se pudo acceder a la base de datos')
    }
  }

  async findAll(paginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = paginacionDto;
    const productos = await this.productoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        productos_modelo: true
      }
    })

    return productos.map( product => ({
      ...product,
      productos_modelo: product.productos_modelo.map( model => model.nombre )
    }))
  }

  async findOne(id: number) {
    const product = await this.productoRepository.findOneBy({ id })
    if (!product)
      throw new NotFoundException(id)
    return product;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const product = await this.productoRepository.preload({
      id: id,
      ...updateProductoDto,
      productos_modelo: []
    })
    if (!product)
      throw new NotFoundException("NO SE PUDO ELIMINAR");
    await this.productoRepository.save(product);
    return product;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productoRepository.delete(id);
    return product;
  }
}
