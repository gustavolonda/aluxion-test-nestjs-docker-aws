import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { FileEntity } from "src/file/infreestructure/entity/file.entity";
import { FileDto } from "../data/file-dto";

@Injectable()
export class FileProfile extends AutomapperProfile   {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
      }
    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, FileDto, FileEntity,
              forMember(
                  d => d.user.id,
                  mapFrom(s => s.user.id)
              ));
            createMap(mapper, FileEntity, FileDto,
              forMember(
                  d => d.user.id,
                  mapFrom(s => s.user.id)
              ));
          };
    }
}
