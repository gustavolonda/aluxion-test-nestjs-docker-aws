import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { AccountApplicationStatusDomain } from "src/common/domain/data/account-application-status-domain";
import { AccountApplicationTypeDomain } from "src/common/domain/data/account-application-type-domain";
import { UserDto } from "src/user/domain/data/user-dto";

export class AccountApplicationDto {
    @ApiProperty()
    @AutoMap()
    id: string;

    @ApiProperty()
    @AutoMap()
    description: string;

    @ApiProperty()
    @AutoMap()
    type: AccountApplicationTypeDomain;

    @ApiProperty()
    @AutoMap()
    status: AccountApplicationStatusDomain;


    @AutoMap()
    createdAt: Date;


    @AutoMap()
    updatedAt: Date;
    
    @ApiProperty()
    @AutoMap()
    user: UserDto;

}
