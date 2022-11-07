import { AutoMap } from "@automapper/classes";
import { Transform } from "class-transformer";
import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { UserEntity } from "src/user/infreestructure/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountApplicationStatusDomain } from "../../../common/domain/data/account-application-status-domain";
import { AccountApplicationTypeDomain } from "../../../common/domain/data/account-application-type-domain";

@Entity("account_application")
export class AccountApplicationEntity  extends BaseEntity{
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({nullable: true})
    description: string;

    @AutoMap()
    @Column()
    type: AccountApplicationTypeDomain;

    @AutoMap()
    @Column()
    status: AccountApplicationStatusDomain;

    @AutoMap()
    @ManyToOne(type => UserEntity, user => user.id)
    @JoinColumn({ name:"user_id" })
    user: UserEntity;
}
