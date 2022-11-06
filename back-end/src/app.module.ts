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
  TypeOrmModule.forFeature([UserEntity,UserDetailsEntity]),
  AutomapperModule.forRoot({
    strategyInitializer: classes(),
  })
],
  controllers: [UserController],
  providers: [UserProfile, UserService, UserDetailsService],
  exports:[UserService]
})
export class AppModule {}
