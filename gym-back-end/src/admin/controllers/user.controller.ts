import { Controller, Delete, Get, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserService } from '../services/user.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    async getAllUsers() {
        try {
            const response = await this.userService.getAllUsers();
            return response;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException({ message: 'Ocurrió un error para encontrar el listado de usuarios' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: number) {
        try {
            const response = await this.userService.deleteUserById(id);
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
}