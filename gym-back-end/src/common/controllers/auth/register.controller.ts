import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RegisterService } from '../../services/auth/register.service';
import { IUser, IUserResponse } from 'src/common/models/interfaces/user.interface';

@Controller('/register')
export class RegisterController {

    constructor(private registerService: RegisterService) { }

    @Post('/')
    async createUser(@Body() body: IUser) {
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

    @Get()
    async allUser() {
        try {
            const user = await this.registerService.getAllUsers();
            if (!user || user.length === 0) {
                throw new HttpException("No hay usuarios registrados", HttpStatus.NO_CONTENT);
            }
            return user;
        } catch {
            throw new HttpException("Error al obtener los usuarios", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<IUserResponse> {
        try {
            const response: IUserResponse = await this.registerService.getUserById(id);
            return response;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                `Error inesperado al obtener el usuario con el ID ${id}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // delete user
    @Delete(':id')
    async deleteUserById(@Param('id') id: number) {
        try {
            const response = await this.registerService.deleteUserById(id);
            return response;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                `Error inesperado al eliminar el usuario con el ID ${id}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Put(':id')
    async updateUserById(@Param('id') id: number, @Body() user: IUser): Promise<IUser> {
        try {
            return this.registerService.updateUserById(id, user);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                `Error inesperado al actualizar el usuario con el ID ${id}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}