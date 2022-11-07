import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user/domain/service/user.service';
import { UserController } from './user/application/rest/controller/user.controller';
import { UserEntity } from './user/infreestructure/entity/user.entity';
import { UserProfile } from './user/domain/mapper/user.profile';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { UserDetailsService } from './user-details/domain/service/user-details.service';
import { UserDetailsEntity } from './user-details/infreestructure/entity/user-details.entity';
import { UserDetailsController } from './user-details/application/rest/controller/user-details.controller';
import { UserDetailsProfile } from './user-details/domain/mapper/user-details-profile';
import { AccountApplicationEntity } from './account-application/infraestructura/entity/account-application.entity';
import { AccountApplicationService } from './account-application/domain/service/account-application.service';
import { AccountApplicationController } from './account-application/application/rest/controller/account-application.controller';
import { AccountApplicationProfile } from './account-application/domain/mapper/account-application-profile';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
        host: 'localhost',
        port: 5430,
        username: 'aluxion_user',
        password: 'zpY08QxK98',
        database: 'aluxion_db',
        entities: [
            __dirname + '/**/*.entity{.ts,.js}',
        ],
        synchronize: true,
  }), 
  TypeOrmModule.forFeature([UserEntity,
                            UserDetailsEntity,
                            AccountApplicationEntity]),
  AutomapperModule.forRoot({
    strategyInitializer: classes(),
  })
],
  controllers: [UserController, 
                UserDetailsController, 
                AccountApplicationController],
  providers: [UserProfile,
              UserDetailsProfile, 
              AccountApplicationProfile,
              UserService, 
              UserDetailsService, 
              AccountApplicationService],
  exports:[UserService]
})
export class AppModule {}
