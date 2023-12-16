/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(@Query() paginacionDto: PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productosService.remove(+id);
  }
}
