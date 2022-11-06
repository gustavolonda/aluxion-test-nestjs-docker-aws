import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { UserEntity } from "src/user/infreestructure/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from "typeorm";

@Entity("user_details")
export class UserDetailsEntity  extends BaseEntity{
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
    
    @AutoMap()
    @Column()
    firstname: string;

    @AutoMap()
    @Column()
    lastname: string;

    @AutoMap()
    @Column()
    email: string;

    @AutoMap()
    @Column()
    address: string;

    @AutoMap()
    @OneToOne(() => UserEntity)
    @JoinColumn({ name:"user_id" })
    userEntity: UserEntity

}
