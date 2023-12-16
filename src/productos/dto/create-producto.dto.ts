/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductoDto {
    @IsString()
    nombre_producto?: string

    @IsString()
    descripcion_producto?: string

    @IsInt()
    stock?: number
    
    @IsString()
    marca?: string

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    productos_modelo?: string[]

    @IsInt()
    @Type(  ()=> Number)
    precio?: number
}
