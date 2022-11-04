import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
