import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/user/domain/data/user-dto";

export class UserDetailsDto {
    @ApiProperty()
    @AutoMap()
    id: number;
    
    @ApiProperty()
    @AutoMap()
    firstname: string;

    @ApiProperty()
    @AutoMap()
    lastname: string;

    @ApiProperty()
    @AutoMap()
    email: string;

    @ApiProperty()
    @AutoMap()
    address: string;

    
}
