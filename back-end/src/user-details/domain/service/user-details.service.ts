import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { UserDetailsEntity } from 'src/user-details/infreestructure/entity/user-details.entity';
import { UserDetailsParameters } from 'src/user-details/infreestructure/entity/user-details-parameters';
import { Repository } from 'typeorm';
import { UserDetailsDto } from '../data/user-details-dto';
import { RegisterRequestDto } from 'src/user/domain/data/register-request-dto';

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

    updateProfile = async (
        userDetailsDto: UserDetailsDto, id: number 
      ): Promise<UserDetailsDto | undefined> => {
        try {
          const entity = this.classMapper.map(userDetailsDto, UserDetailsDto, UserDetailsEntity);
          return this.classMapper.mapAsync(await this.updateById(entity, id), UserDetailsEntity, UserDetailsDto);
        }
        catch (ex) {
          throw new Error(`Update error: ${ex.message}.`);
        }
      };

    toUserDetailsEntity(dto: UserDetailsDto): UserDetailsEntity {  
        return this.classMapper.map(dto, UserDetailsDto, UserDetailsEntity);

    } 

    toUserDetailsDto(entity : UserDetailsEntity): UserDetailsDto{
        return this.classMapper.map(entity,UserDetailsEntity, UserDetailsDto);

    }

    getRelations() {
      return {};
    }
   

}
