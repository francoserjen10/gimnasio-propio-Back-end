import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from './dataBase.service';
import { RowDataPacket } from 'mysql2';
import userQueries from '../queries/user.query';
import * as bcrypt from 'bcryptjs'
import { IUserResponseDTO } from '../dto/userResponse.dto';

@Injectable()
export class LoginService {

    constructor(private dbService: DataBase) { }

    // Le llegan los datos (mail - password)
    async validateUser(email: string, password: string): Promise<IUserResponseDTO | null> {
        try {
            // 1- comparar el mail entrante con los de la base de datos
            const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(userQueries.selectByEmail, [email]);

            // 2- si no existe, error
            if (resultQuery.length === 0) {
                throw new HttpException('Usuario incorrecto!!', HttpStatus.BAD_REQUEST);
            }

            // 3- comparar contraseña entrante con la hasheada de ese usuario encontrado
            const passwordCompared = await bcrypt.compare(password, resultQuery[0]['contraseña']);

            // 4- si no existe, error
            if (!passwordCompared) {
                throw new HttpException('Contraseña incorrecta!!', HttpStatus.BAD_REQUEST);
            }

            // 5- retornar (IUserResponseDTO)
            return {
                id: resultQuery[0]['usuario_id'],
                name: resultQuery[0]['nombre'],
                lastName: resultQuery[0]['apellido'],
                phoneNumber: resultQuery[0]['numero_telefono'],
                birthDate: resultQuery[0]['fecha_nacimiento'],
                dni: resultQuery[0]['dni'],
                email: resultQuery[0]['email'],
                // password: string;
                // urlImage?: [0]['nombre'],
                rolId: resultQuery[0]['contraseña'],
                emergencyContact: resultQuery[0]['contacto_de_emergencia'],
                direction: resultQuery[0]['dirección'],
            }
        } catch (error) {
            console.error("Error al loggerse:", error);
            throw new HttpException('Ocurrió un error al intentar acceder sesion', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}