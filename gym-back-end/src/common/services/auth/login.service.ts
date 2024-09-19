import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { UserResponseDTO } from '../../dto/userResponse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    // Le llegan los datos (mail - password)
    async validateUser(email: string, password: string): Promise<UserResponseDTO | null> {
        try {
            //    1- comparar el mail entrante con los de la base de datos
            const user = await this.userRepository.findOneBy({ email })

            //    2- si no existe, error
            if (!user || user === null) {
                throw new HttpException('Usuario incorrecto!!', HttpStatus.BAD_REQUEST);
            }

            //    3- comparar contraseña entrante con la hasheada de ese usuario encontrado
            const passwordCompared = await bcrypt.compare(password, user.password);

            //    4- si no existe, error
            if (!passwordCompared) {
                throw new HttpException('Contraseña incorrecta!!', HttpStatus.BAD_REQUEST);
            }
            return user;
        } catch (error) {
            console.error("Error al loggerse:", error);
            throw new HttpException('Ocurrió un error al intentar acceder sesion', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}