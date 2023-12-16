/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductoEntity } from "./producto.entity";

@Entity()
export class ModeloEntity {
    @PrimaryGeneratedColumn({name: 'id_modelo'})
    id: number;

    @Column({ type: 'character varying', name: 'nombre_modelo'})
    nombre: string;

    @ManyToOne(() => ProductoEntity, producto => producto.productos_modelo)
    @JoinColumn({ name: 'modelo' })
    modeloId: ProductoEntity;

}