import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/models/entities/user.entity';
import { IUserResponse } from 'src/common/models/interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getAllUsers() {
        try {
            const allUsers: IUserResponse[] = await this.userRepository.find();
            const onlyClients: IUserResponse[] = allUsers.filter(user => user.rolId !== 1);
            return {
                status: HttpStatus.OK,
                message: 'Usuarios encontrados correctamente',
                data: onlyClients,
            };
        } catch (error) {
            console.error("Error al traer el listado de usuarios:", error);
            throw new HttpException({ message: 'Ocurrió un error para encontrar el listado de usuarios' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUserById(id: number): Promise<{ message: string; affected: number }> {
        try {
            const userDeleted = await this.userRepository.delete({ usuario_id: id });
            if (userDeleted.affected === 0) {
                this.logger.warn(`Usuario con id ${id} no encontrado`);
                throw new NotFoundException(`Usuario con id ${id} no encontrado`);
            }
            this.logger.log(`Usuario con id ${id} eliminado correctamente!`);
            return { message: `Usuario con id ${id} eliminado correctamente`, affected: userDeleted.affected };
        } catch (error) {
            this.logger.error(`Error al eliminar el usuario con id ${id}`, error.stack);
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
