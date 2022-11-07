import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { UserDto } from "src/user/domain/data/user-dto";

export class FileDto {
    @AutoMap()
    @ApiProperty()
    @IsNumber()
    id: number;

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    type: string;

    @AutoMap()
    @ApiProperty()
    awsId: string;
    
    @AutoMap()
    @ApiProperty()
    user: UserDto

  }
