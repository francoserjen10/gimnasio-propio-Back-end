import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserResponse } from 'src/common/models/interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    // Le llegan los datos (mail - password)
    async validateUser(email: string, password: string): Promise<IUserResponse | null> {
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

    getUserRole(token: string): { rolId: number } | null {
        try {
            if (!token) {
                this.logger.warn('Token no encontrado');
                throw new UnauthorizedException('Token no encontrado');
            }
            const decodedToken: IUser = jwtDecode<User>(token);
            return { rolId: decodedToken.rolId };
        } catch (error) {
            this.logger.error(`Error al decodificar el token: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al procesar el token');
        }
    }
}
