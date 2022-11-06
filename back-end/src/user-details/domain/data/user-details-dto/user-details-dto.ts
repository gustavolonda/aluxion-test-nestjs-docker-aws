import { AutoMap } from "@automapper/classes";
import { UserDto } from "src/user/domain/data/user-dto";

export class UserDetailsDto {

    @AutoMap()
    id: number;
    
    @AutoMap()
    firstname: string;

    @AutoMap()
    lastname: string;

    @AutoMap()
    email: string;

    @AutoMap()
    address: string;

    @AutoMap()
    userEntity: UserDto
}
