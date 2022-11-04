import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @CreateDateColumn()
    @Column({name:"created_at"})
    createdAt: Date;

    @UpdateDateColumn()
    @Column({name:"updated_at"})
    updatedAt: Date;

    @Column()
    active: boolean;
}
