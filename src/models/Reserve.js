import { Entity, JoinColumn, OneToMany, CreateDateColumn, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Flight } from "./Flight";
import { User } from "./User";



@Entity()
export class Reserve {

    @PrimaryGeneratedColumn()
    id;

    @ManyToOne(() => Flight, { cascade: true })
    @JoinColumn()
    flight;

    @Column("int")
    numberOfPassengers;

    @ManyToOne(() => User)
    @JoinColumn()
    user;

    @CreateDateColumn()
    createdAt = undefined;

    @Column("boolean")
    transport;

    @Column("boolean")
    hotel;

    @Column("boolean")
    restauration;

    @Column("varchar")
    finalPrice;
}