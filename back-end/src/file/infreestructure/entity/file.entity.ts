import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/common/infreestructure/entity/base-entity";
import { UserEntity } from "src/user/infreestructure/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne  } from "typeorm";

@Entity("file")
export class FileEntity  extends BaseEntity{
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
    @AutoMap()
    @Column()
    name: string;

    
    @AutoMap()
    @Column()
    type: string;

    @AutoMap()
    @Column({ name:"aws_id" ,nullable: true })
    awsId: string;

    @AutoMap()
    @ManyToOne(type => UserEntity, user => user.id,{ nullable: true})
    @JoinColumn({ name:"user_id"}) 
    user: UserEntity;
}
