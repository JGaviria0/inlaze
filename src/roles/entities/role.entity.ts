import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Role {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    full_name: string;

    @Column()
    is_deleted: boolean = false; 

    @Column()
    created_at: Date;
    
    @Column()
    updated_at: Date;
}