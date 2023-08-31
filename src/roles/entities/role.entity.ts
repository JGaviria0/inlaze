import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "roles"})
export class Role {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;

    @Column()
    is_deleted: boolean = false; 

    @Column()
    created_at: Date;
    
    @Column()
    updated_at: Date;
}
