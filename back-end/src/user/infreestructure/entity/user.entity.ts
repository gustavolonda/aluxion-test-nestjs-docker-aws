import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { FileEntity } from "src/file/infreestructure/entity/file/file.entity";
import {  UserDetailsEntity } from "src/user-details/infreestructure/entity/user-details.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne  } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(() => UserDetailsEntity)
    @JoinColumn({ name:"user_details_id" })
    userDetailsEntity: UserDetailsEntity

    @OneToOne(() => FileEntity, (fileEntity) => fileEntity.userEntity) // specify inverse side as a second parameter
    fileEntity: FileEntity
}
