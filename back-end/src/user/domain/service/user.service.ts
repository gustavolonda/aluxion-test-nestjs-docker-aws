import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
import { Repository } from 'typeorm';
import { UserParameters } from '../data/user-parameters';

@Injectable()
export class UserService extends AbstraCrudService<UserEntity,number> {
   
    constructor ( @InjectRepository(UserEntity) 
                private   readonly repository: Repository<UserEntity>,
    ){
        super(repository);
    }

    getSelectedParameters() {
        return enumToArray(UserParameters);
    }
 

}