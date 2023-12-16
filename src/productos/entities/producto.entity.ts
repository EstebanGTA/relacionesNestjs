/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModeloEntity } from "./modelo.entity";

@Entity()
export class ProductoEntity {
    @PrimaryGeneratedColumn({name: 'id_producto'})
    id: number;

    @Column({ type: 'integer' })
    stock: number;

    @Column({ type: 'character varying' })
    nombre_producto: string;

    @Column({ type: 'character varying' })
    descripcion_producto: string;

    @OneToMany(() => ModeloEntity, producto => producto.modeloId, {cascade: true, eager: true})
    productos_modelo?: ModeloEntity[];

    @Column({ type: 'character varying' })
    marca: string;

    @Column({ type: 'numeric' })
    precio: number;
}
