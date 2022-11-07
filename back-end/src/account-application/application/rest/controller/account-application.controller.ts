import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountApplicationDto } from 'src/account-application/domain/data/account-application-dto';
import { AccountApplicationService } from 'src/account-application/domain/service/account-application.service';
import { Constants } from 'src/config/constants';


@ApiTags('Account Application')
@Controller('account-application')
export class AccountApplicationController {
    constructor(private accountApplicationService: AccountApplicationService){
    }
    @Get()
    @ApiResponse({ status: 200, description: 'Return a list of Account Application'})
    getAll(@Res() response){
        this.accountApplicationService.getAll().then(
            list => {
                response.json(this.accountApplicationService.toAccountApplicationDtoList(list));
        })
    }

    @Get(":id")
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a Account Application that exists in the database',
        type: String
      })
      @ApiResponse({
        status: 200,
        description: 'A Account Application has been successfully fetched',
        type: AccountApplicationDto
      })
      @ApiResponse({
        status: 404,
        description: 'A Account Application with given id does not exist.'
      })
    getById(@Param() { id }, @Res() response){
        this.accountApplicationService.getById(String(id)).then(
            u => {
                response.json(this.accountApplicationService.toAccountApplicationDto(u));
        })
    }

    @ApiBody({ type: AccountApplicationDto })
    @Post()
    save(@Body() accountApplicationDto: AccountApplicationDto, @Res() response){
        var accountApplicationEntity = this.accountApplicationService.toAccountApplicationEntity(accountApplicationDto);
        Logger.debug(accountApplicationEntity.user.id);
        this.accountApplicationService.save(this.accountApplicationService.toAccountApplicationEntity(accountApplicationDto)).then(r => {
            response.json(this.accountApplicationService.toAccountApplicationDto(r));
        }).catch(err => {
            Logger.error(err.message);
        });

    }
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a Account Application that exists in the database',
        type: Number
      })
    @Get(Constants.MAPPING_ACTIVATE_ACCOUNT)
    accountActivate(@Param() { id }, @Res() response){
        this.accountApplicationService.accountActivate(id).then(r => {
            response.json(r);
        })

    }
}
