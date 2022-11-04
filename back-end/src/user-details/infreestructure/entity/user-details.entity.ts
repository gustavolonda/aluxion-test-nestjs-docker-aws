import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { UserEntity } from "src/user/infreestructure/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne  } from "typeorm";

@Entity("user_details")
export class UserDetailsEntity  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    photo: string;

    @OneToOne(() => UserEntity, (userEntity) => userEntity.userDetailsEntity) // specify inverse side as a second parameter
    userEntity: UserEntity


}
