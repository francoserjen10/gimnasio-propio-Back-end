import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { IUserDTO } from '../dto/user.dto';

@Controller('/register')
export class RegisterController {

    constructor(private registerService: RegisterService) { }

    @Post('/create-user')
    async createUser(@Body() body: IUserDTO) {
        const user = await this.registerService.createUser(body)
        return user
    }
}
