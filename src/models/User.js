import { Entity, Column, OneToMany, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Reserve } from "./Reserve";



@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    code;

    @Column("varchar")
    nom = "";

    @Column("varchar")
    prenom = "";

    @Column("varchar")
    email = "";

    @Column("varchar")
    role = "";

    @Column("varchar")
    phone = "";

    @Column("varchar")
    password = "";

    @OneToMany(() => Reserve, { cascade: true })
    myReservations;

    @CreateDateColumn()
    createdAt = undefined;

}