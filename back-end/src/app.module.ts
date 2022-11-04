import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/domain/service/user.service';
import { UserController } from './user/application/rest/controller/user.controller';
import { UserEntity } from './user/infreestructure/entity/user.entity';

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
  }), TypeOrmModule.forFeature([UserEntity])],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
