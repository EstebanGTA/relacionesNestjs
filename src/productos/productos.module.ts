/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './entities/producto.entity';
import { ModeloEntity } from './entities/modelo.entity';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([ProductoEntity, ModeloEntity]),],
})
export class ProductosModule {}
