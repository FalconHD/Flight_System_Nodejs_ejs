import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { City } from "./City";

@Entity()
export class Flight {

    @PrimaryGeneratedColumn()
    id = undefined;

    @Column("varchar")
    name = "";

    @ManyToOne(() => City, { cascade: true } )
    origin

    @ManyToOne(() => City, { cascade: true })
    destination

    @Column("date")
    date

    @Column("time")
    startingTime

    @Column("time")
    endingTime

    @Column("varchar")
    price

    @Column("varchar")
    airline

    @Column("varchar")
    capacity

    @Column("varchar")
    available

    @ManyToMany(() => City, city => city.flights, { cascade: true })
    @JoinTable()
    escale

    @CreateDateColumn()
    createdAt = undefined;

}