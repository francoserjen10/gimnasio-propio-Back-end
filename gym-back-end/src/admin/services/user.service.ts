import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/models/entities/user.entity';
import { IUserResponse } from 'src/common/models/interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

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
}
