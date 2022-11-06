import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserDetailsEntity } from "src/user-details/infreestructure/entity/user-details.entity";
import { RegisterRequestDto } from "src/user/domain/data/register-request-dto";
import { UserDetailsDto } from "../../domain/data/user-details-dto/user-details-dto";

@Injectable()
export class UserDetailsProfile extends AutomapperProfile  {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, RegisterRequestDto, UserDetailsEntity);
            createMap(mapper, UserDetailsEntity, UserDetailsDto);
          };
    }}
