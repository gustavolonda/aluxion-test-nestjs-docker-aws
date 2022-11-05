import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/infreestructure/entity/user.entity";
import { RegisterRequestDto } from "../data/register-request-dto";
import { UserDto } from "../data/user-dto";


@Injectable()
export class UserProfile extends AutomapperProfile  {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, RegisterRequestDto, UserEntity);
            createMap(mapper, UserEntity, UserDto);
          };
    }


}
