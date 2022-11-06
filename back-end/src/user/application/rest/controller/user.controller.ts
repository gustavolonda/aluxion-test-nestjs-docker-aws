import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';

import { UserService } from 'src/user/domain/service/user.service';
import { ApiTags,ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
import { RegisterRequestDto } from 'src/user/domain/data/register-request-dto';
import { Http2ServerRequest } from 'http2';

@Controller('user')
@ApiTags('User')
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
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a user that exists in the database',
        type: Number
      })
      @ApiResponse({
        status: 200,
        description: 'A user has been successfully fetched',
        type: UserEntity
      })
      @ApiResponse({
        status: 404,
        description: 'A user with given id does not exist.'
      })
    getById(@Param() { id }, @Res() response){
        this.userService.getById(Number(id)).then(
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
    @Delete(":id")
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Delete User by ID',
        type: Number
      })
      @ApiResponse({
        status: 200,
        description: 'A user has been successfully delete',
        type: Boolean
      })
    delete(@Param() { id }, @Res() response){
        this.userService.delete(Number(id)).then(
            u => {
                if(u === true)
                    response.status(HttpStatus.OK).json(true);
                else  
                    response.status(HttpStatus.OK).json("No se conontro");
               
               
        }).catch(
            u => {
                response.status(HttpStatus.NOT_MODIFIED).json(false);
      
        })

    }
}


