import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // role

    @Column()
    is_deleted: boolean = false; 

    @Column()
    created_at: Date;
    
    @Column()
    updated_at: Date;
}
