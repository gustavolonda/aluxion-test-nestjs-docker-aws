import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { UserService } from 'src/user/domain/service/user.service';
import { ApiTags,ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
import { RegisterRequestDto } from 'src/user/domain/data/register-request-dto';
@Controller('user')
export class UserController {
    constructor(private userService: UserService){
    }
    @Get()
    @ApiResponse({ status: 200, description: 'Return a list of Users'})
    getAll(@Res() response){
        this.userService.getAll().then(
            list => {
                response.json(list);
        })
    }
    @Get(":id")
    getById(@Param() params: { id: number }, @Res() response){
        this.userService.getById(params.id).then(
            u => {
                response.json(u);
        })
    }
    @ApiBody({ type: RegisterRequestDto })
    @Post()
    save(@Body() registerRequestDto: RegisterRequestDto, @Res() response){
        this.userService.registerUser(registerRequestDto).then(r => {
            response.json(r);
        })

    }
}
function ApiParam(arg0: { name: string; required: boolean; description: string; type: NumberConstructor; }) {
    throw new Error('Function not implemented.');
}

