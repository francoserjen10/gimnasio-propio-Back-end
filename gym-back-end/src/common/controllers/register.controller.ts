import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { IUserDTO } from '../dto/user.dto';

@Controller('/register')
export class RegisterController {

    constructor(private registerService: RegisterService) { }

    @Post('/')
    async createUser(@Body() body: IUserDTO) {
        try {
            const user = await this.registerService.createUser(body);
            if (!user) {
                throw new HttpException('No se reconoce el usuario', HttpStatus.BAD_REQUEST);
            }
            return this.registerService.createToken(user);
        } catch (error) {
            throw new HttpException("Error al crear el usuario", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Get()
    // async allUser() {
    //     try {
    //         const user = await this.registerService.getAllUsers();
    //         if (!user || user.length === 0) {
    //             throw new HttpException("No hay usuarios registrados", HttpStatus.NO_CONTENT);
    //         }
    //         return user;
    //     } catch {
    //         throw new HttpException("Error al obtener los usuarios", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
