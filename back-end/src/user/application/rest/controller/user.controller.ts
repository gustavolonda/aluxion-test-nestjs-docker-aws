import { Controller, Get, Param, Res } from '@nestjs/common';

import { UserService } from 'src/user/domain/service/user.service';
@Controller('user')
export class UserController {
    constructor(private userService: UserService){
    }
    @Get()
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
}
