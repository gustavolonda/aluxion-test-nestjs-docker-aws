import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '../data/register-request-dto';
import { UserDto } from '../data/user-dto';
import { UserParameters } from '../../infreestructure/entity/user-parameters';
import { UserDetailsService } from 'src/user-details/domain/service/user-details.service';
import { UserDetailsEntity } from 'src/user-details/infreestructure/entity/user-details.entity';
import { AccountApplicationService } from 'src/account-application/domain/service/account-application.service';
import { AccountApplicationEntity } from 'src/account-application/infraestructura/entity/account-application.entity';
import { AccountApplicationStatusDomain } from 'src/common/domain/data/account-application-status-domain';
import { AccountApplicationTypeDomain } from 'src/common/domain/data/account-application-type-domain';
import { Constants } from 'src/config/constants';

import { v4 as uuid } from 'uuid';
import { SendEmail } from 'src/common/util/send-email';
@Injectable()
export class UserService extends AbstraCrudService<UserEntity,number> {
  
    constructor ( @InjectRepository(UserEntity)
                private   readonly repository: Repository<UserEntity>,
                @InjectMapper() private readonly classMapper: Mapper ,
                @InjectRepository(UserDetailsEntity)  private userDetailsService: UserDetailsService,
                @InjectRepository(AccountApplicationEntity)  private accountApplicationService: AccountApplicationService
    ){
        super(repository);
    }

    getSelectedParameters() {
        return enumToArray(UserParameters);
    }
    entityDelete(entity: UserEntity): UserEntity {
      return Builder(entity).active(false)
                            .build();
    }
    entityUpdate(entityNew: UserEntity, entityOld: UserEntity): UserEntity {
      return Builder(entityOld).password(entityNew.password)
                                .build();
    }

     registerUser = async (
        item: RegisterRequestDto,
      ): Promise<UserDto | undefined> => {
        try {
          var userDetailsEntity = this.registerRequestDtoToUserDetailsEntity(item);
          userDetailsEntity = await this.userDetailsService.save(userDetailsEntity).catch(e =>{throw new Error(`Update profile error: ${e.message}.`); });
          var userEntity = this.registerRequestDtoToUserEntity(item);
          userEntity.userDetailsEntity = userDetailsEntity;
          userEntity = await this.repository.save(userEntity);
          var accountApplicationEntity : AccountApplicationEntity;
          const id: string = uuid();
          const activateAccountURL = Constants.HTTP+Constants.LOCAL_HOST+Constants.MAPPING_ACCOUNT_APPLICATION+ Constants.MAPPING_ACTIVATE_ACCOUNT.replace(":id", id);
          const description  = "Muchas gracias por registarse para activar su cuenta haga click "+ activateAccountURL;
          var sendEmail = new SendEmail();
          var status = AccountApplicationStatusDomain.PEMDIMG;
         await sendEmail.send("gustavolonda@gmail.com",userDetailsEntity.email,"Activar Cuenta",description).then(r => {
                status = AccountApplicationStatusDomain.SENT;
         });
          accountApplicationEntity = Builder(accountApplicationEntity).id(id)
                                                                  .type(AccountApplicationTypeDomain.Activate_Account)
                                                                  .status(status)
                                                                  .user(userEntity)
                                                                  .description(description)
                                                                  .build();

         accountApplicationEntity = await this.accountApplicationService.save(accountApplicationEntity);
         
        
        
         return this.toUserDto(userEntity);
        }
        catch (ex) {
          throw new Error(`create error: ${ex.message}.`);
        }
      };

      getRelations() {
        return {userDetailsEntity:true};
      }

    toUserEntity(dto: UserDto): UserEntity {  
      return this.classMapper.map(dto, UserDto, UserEntity);

    } 

    toUserDto(entity : UserEntity): UserDto{
        return this.classMapper.map(entity,UserEntity, UserDto);
    }

    registerRequestDtoToUserEntity(dto: RegisterRequestDto): UserEntity {  
      return this.classMapper.map(dto, RegisterRequestDto, UserEntity);

    } 
    registerRequestDtoToUserDetailsEntity(dto: RegisterRequestDto): UserDetailsEntity {  
      return this.classMapper.map(dto, RegisterRequestDto, UserDetailsEntity);

    } 

}