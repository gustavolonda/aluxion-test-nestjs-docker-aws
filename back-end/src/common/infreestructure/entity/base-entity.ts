import { AutoMap } from "@automapper/classes";
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @AutoMap()
    @CreateDateColumn({name:"created_at"})
    createdAt: Date;

    @AutoMap()
    @UpdateDateColumn({nullable: true, name:"updated_at"})
    updatedAt: Date;

    @AutoMap()
    @Column({
        nullable: false,
        default:  true,
        type: 'bool',
      })
    active: boolean;
}
