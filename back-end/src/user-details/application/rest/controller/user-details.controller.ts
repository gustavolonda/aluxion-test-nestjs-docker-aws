import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDetailsDto } from 'src/user-details/domain/data/user-details-dto';
import { UserDetailsService } from 'src/user-details/domain/service/user-details.service';

@Controller('user')
@ApiTags('User')
export class UserDetailsController {
    constructor(private service: UserDetailsService){
    }

    @Put(":id/profile")
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a user that exists in the database',
        type: Number
      })
      @ApiResponse({
        status: 200,
        description: 'A user has been successfully fetched',
        type: UserDetailsDto
      })
    @ApiBody({ type: UserDetailsDto })
    updateProfile(@Param() { profileId }, @Body() userDetailsDto: UserDetailsDto, @Res() response){
        this.service.updateProfile(userDetailsDto,profileId).then(r => {
            response.json(r);
        })

    }

}
