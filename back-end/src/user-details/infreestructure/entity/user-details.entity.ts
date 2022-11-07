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
    @Column({nullable : true})
    firstname: string;

    @AutoMap()
    @Column({nullable : true})
    lastname: string;

    @AutoMap()
    @Column({nullable : false})
    email: string;

    @AutoMap()
    @Column({nullable : true})
    address: string;


    @OneToOne(() => UserEntity, (userEntity) => userEntity.userDetailsEntity) // specify inverse side as a second parameter
    userEntity: UserEntity

}
