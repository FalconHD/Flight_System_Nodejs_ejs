import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { Flight } from "./Flight";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id = undefined;

    @Column("varchar")
    name = "";

    @Column("varchar")
    country = "";


}