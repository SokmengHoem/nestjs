import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50, nullable:true})
    firstName?: string;

    @Column({length: 50, nullable: true})
    lastName?: string;

    @Column({length:255, nullable:true})
    email: string;

    @Column({length: 255, nullable: true})
    password: string;

}
