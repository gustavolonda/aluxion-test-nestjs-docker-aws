import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '../data/register-request-dto';
import { UserDto } from '../data/user-dto';
import { UserParameters } from '../data/user-parameters';

@Injectable()
export class UserService extends AbstraCrudService<UserEntity,number> {
   
   
    constructor ( @InjectRepository(UserEntity) 
                private   readonly repository: Repository<UserEntity>,
                @InjectMapper() private readonly classMapper: Mapper,
    ){
        super(repository);
    }

    getSelectedParameters() {
        return enumToArray(UserParameters);
    }
    entityDelete(entity: UserEntity): UserEntity {
        throw new Error('Method not implemented.');
    }
    entityUpdate(entity: UserEntity): UserEntity {
        throw new Error('Method not implemented.');
    }

     registerUser = async (
        item: RegisterRequestDto,
      ): Promise<UserDto | undefined> => {
        try {
          const entity = this.classMapper.map(item, RegisterRequestDto, UserEntity);
          return this.classMapper.mapAsync(await this.repository.save(entity), UserEntity, UserDto);
        }
        catch (ex) {
          throw new Error(`create error: ${ex.message}.`);
        }
      };
    

}