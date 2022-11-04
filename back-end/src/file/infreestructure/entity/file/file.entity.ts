import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { UserEntity } from "src/user/infreestructure/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from "typeorm";

@Entity("file")
export class FileEntity  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ name:"aws_id" })
    awsId: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name:"user_id" })
    userEntity: UserEntity
}
