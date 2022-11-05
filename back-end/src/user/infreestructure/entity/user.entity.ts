import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { FileEntity } from "src/file/infreestructure/entity/file/file.entity";
import {  UserDetailsEntity } from "src/user-details/infreestructure/entity/user-details.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne  } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity{
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    username: string;

    @AutoMap()
    @Column()
    password: string;

    @OneToOne(() => UserDetailsEntity, (userDetailsEntity) => userDetailsEntity.userEntity) // specify inverse side as a second parameter
    userDetailsEntity: UserDetailsEntity

    @OneToOne(() => FileEntity, (fileEntity) => fileEntity.userEntity) // specify inverse side as a second parameter
    fileEntity: FileEntity
}
