import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { AccountApplicationParameters } from 'src/account-application/infraestructura/entity/account-application-parameters';
import { AccountApplicationEntity } from 'src/account-application/infraestructura/entity/account-application.entity';
import { AccountApplicationStatusDomain } from 'src/common/domain/data/account-application-status-domain';
import { AccountApplicationTypeDomain } from 'src/common/domain/data/account-application-type-domain';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { SendEmail } from 'src/common/util/send-email';
import { UserDetailsService } from 'src/user-details/domain/service/user-details.service';
import { UserDetailsEntity } from 'src/user-details/infreestructure/entity/user-details.entity';
import { UserService } from 'src/user/domain/service/user.service';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
import { Repository } from 'typeorm';
import { AccountApplicationDto } from '../data/account-application-dto';

@Injectable()
export class AccountApplicationService extends AbstraCrudService<AccountApplicationEntity,string>{
    
    constructor ( @InjectRepository(AccountApplicationEntity) 
        private   readonly repository: Repository<AccountApplicationEntity>,
        @InjectRepository(UserDetailsEntity)  private userDetailsService: UserDetailsService,
        @InjectRepository(UserEntity)  private userService: UserService,
        @InjectMapper() private readonly classMapper: Mapper 
    ){
        super(repository);
    }
    getSelectedParameters() {
        return enumToArray(AccountApplicationParameters);
    }
    getRelations() {
        return {user:{userDetailsEntity:true}};
    }
    entityDelete(entity: AccountApplicationEntity): AccountApplicationEntity {
        return Builder(entity).active(false)
                              .build();
    }
    entityUpdate(entityNew: AccountApplicationEntity, entityOld: AccountApplicationEntity): AccountApplicationEntity {
        return Builder(entityOld).description(entityNew.description)
                                .status(entityNew.status)
                                .build();
    }

    async statusChange(id: string, status = AccountApplicationStatusDomain.OK): Promise<AccountApplicationEntity> {
        var entity = await this.getById(id);
        entity.status = status;
        return await this.update(entity)

    }

    async typeChange(id: string, type: AccountApplicationTypeDomain): Promise<AccountApplicationEntity> {
        var entity = await this.getById(id);
        entity.type = type;
        return await this.update(entity)

    }

    async accountActive(id: string): Promise<AccountApplicationEntity> {
        return await this.statusChange(id, AccountApplicationStatusDomain.OK);
    
    }

    async accountActivate(id: string): Promise<AccountApplicationEntity> {
            var accountApplicationEntity = await this.statusChange(id, AccountApplicationStatusDomain.OK).then(async r =>{
               var accountApplicationEntity = await this.getById(id);
                var sendEmail = new SendEmail();
                var userDetailsEntity = accountApplicationEntity.user.userDetailsEntity ;
                const message = "Su cuenta hacido activada con exito"
                sendEmail.send("gustavolonda@gmail.com",userDetailsEntity.email,"Activar Cuenta", message)
                return accountApplicationEntity;
            });

            return accountApplicationEntity;
          
    }

    toAccountApplicationEntity(dto: AccountApplicationDto): AccountApplicationEntity {  
        return this.classMapper.map(dto, AccountApplicationDto,AccountApplicationEntity);

    } 

    toAccountApplicationDto(entity : AccountApplicationEntity): AccountApplicationDto{
        return this.classMapper.map(entity,AccountApplicationEntity,AccountApplicationDto);

    }

    toAccountApplicationDtoList(entityList : AccountApplicationEntity[]): AccountApplicationDto[]{
        return entityList.map( e => {return this. toAccountApplicationDto(e)});

    }
}

