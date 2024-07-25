import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { IUserDTO } from '../dto/user.dto';

@Controller('/register')
export class RegisterController {

    constructor(private registerService: RegisterService) { }

    @Post('/create-user')
    async createUser(@Body() body: IUserDTO) {
        try {
            const user = await this.registerService.createUser(body);
            return this.registerService.login(user);
        } catch (error) {
            throw new HttpException("Error al crear el usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
