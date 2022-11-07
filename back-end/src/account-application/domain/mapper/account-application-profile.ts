import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { AccountApplicationEntity } from "src/account-application/infraestructura/entity/account-application.entity";
import { AccountApplicationDto } from "../data/account-application-dto";

@Injectable()
export class AccountApplicationProfile  extends AutomapperProfile  {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, AccountApplicationDto, AccountApplicationEntity,
              forMember(
                  d => d.user.id,
                  mapFrom(s => s.user.id)
              ));
            createMap(mapper, AccountApplicationEntity, AccountApplicationDto,
              forMember(
                  d => d.user.id,
                  mapFrom(s => s.user.id)
              ));
          };
    }
}
