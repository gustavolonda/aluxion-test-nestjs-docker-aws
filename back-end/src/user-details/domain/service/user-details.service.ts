import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { UserDetailsEntity } from 'src/user-details/infreestructure/entity/user-details.entity';
import { UserDetailsParameters } from 'src/user-details/infreestructure/entity/user-parameters';
import { Repository } from 'typeorm';

@Injectable()
export class UserDetailsService  extends AbstraCrudService<UserDetailsEntity,number> {

    constructor ( @InjectRepository(UserDetailsEntity) 
                private   readonly repository: Repository<UserDetailsEntity>,
                @InjectMapper() private readonly classMapper: Mapper,
    ){
        super(repository);
    }
    getSelectedParameters() {
        return enumToArray(UserDetailsParameters);
    }
    entityDelete(entity: UserDetailsEntity): UserDetailsEntity {
        return Builder(entity).active(false)
                             .build();
    }
    entityUpdate(entityNew: UserDetailsEntity, entityOld: UserDetailsEntity): UserDetailsEntity {
        return Builder(entityOld).firstname(entityNew.firstname)
                                .lastname(entityNew.lastname)
                                .address(entityNew.address)
                                .email(entityNew.email)
                                .build();
    }

}
