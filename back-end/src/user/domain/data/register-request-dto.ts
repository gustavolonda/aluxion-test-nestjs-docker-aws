import { IsEmail, IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
 

export class RegisterRequestDto {
    @AutoMap()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    username: string;

    @AutoMap()
    @ApiProperty()
    firstname: string;

    @AutoMap()
    @ApiProperty()
    lastname: string;
   
    @AutoMap()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @AutoMap()
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @ApiProperty()
    password: string;
   
   
  
}
