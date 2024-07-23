import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBase } from './dataBase.service';
import { IUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader } from 'mysql2';
import userQueries from '../queries/user.query';
import { IUserResponseDTO } from '../dto/userResponse.dto';

@Injectable()
export class RegisterService {
    saltRounds: number = 10;

    constructor(private dbService: DataBase) { }

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, this.saltRounds);
        } catch (error) {
            console.error("Error al hashear la contrsenia:", error);
            throw new HttpException('Ocurrio un error al hashear la contraseña del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(user: IUserDTO): Promise<IUserResponseDTO> {
        try {
            const hashedPassword = await this.hashPassword(user.password);
            if (!hashedPassword) {
                // throw new Error("Ocurrio un error al hashear la contrasenia");
                throw new HttpException('Ocurrio un error al hashear la contraseña del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const resultQuery: ResultSetHeader = await this.dbService.executeQuery(
                // Crear las queries de la tabla de usuarios de la base de datos
                userQueries.insertUser,
                [user.name, user.lastName, user.phoneNumber, user.birthDate, user.dni, user.email, hashedPassword, user.rolId ?? 2]
            );

            return {
                id: resultQuery.insertId,
                name: user.name,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                birthDate: user.birthDate,
                dni: user.dni,
                email: user.email,
                rolId: user.rolId,
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('El usuario con este correo electrónico ya existe');
            }
        }

    }
}
