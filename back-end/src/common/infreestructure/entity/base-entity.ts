import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @CreateDateColumn({name:"created_at"})
    createdAt: Date;

    @UpdateDateColumn({nullable: true, name:"updated_at"})
    updatedAt: Date;

    @Column({
        nullable: false,
        default:  true,
        type: 'bool',
      })
    active: boolean;
}
