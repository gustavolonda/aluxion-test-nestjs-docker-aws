import { AutoMap } from "@automapper/classes";
import { AccountApplicationEntity } from "src/account-application/infraestructura/entity/account-application.entity";
import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { FileEntity } from "src/file/infreestructure/entity/file.entity";
import {  UserDetailsEntity } from "src/user-details/infreestructure/entity/user-details.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany  } from "typeorm";

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

    @AutoMap()
    @OneToOne(() => UserDetailsEntity)
    @JoinColumn({ name:"user_details_id" })
    userDetailsEntity: UserDetailsEntity

    @OneToMany(type => FileEntity, fileEntity => fileEntity.id)
    fileEntities: FileEntity[]

    @OneToMany(type => AccountApplicationEntity, accountApplicationEntity => accountApplicationEntity.id)
    accountApplicationEntities: AccountApplicationEntity[]
}
