import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { UserDetailsDto } from "src/user-details/domain/data/user-details-dto";

export class UserDto {
    @ApiProperty()
    @AutoMap()
    id: number;
    
    @ApiProperty()
    @AutoMap()
    username: string;

    @ApiProperty()
    @AutoMap()
    userDetailsDto: UserDetailsDto

}
