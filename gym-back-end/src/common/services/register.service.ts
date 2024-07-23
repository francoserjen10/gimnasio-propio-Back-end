import { Injectable } from '@nestjs/common';
import { DataBase } from './dataBase.service';
import { IUserDTO } from '../dto/usuario.dto';
import { bcrypt } from 'bcryptjs';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class RegisterService {
    saltRounds: number = 10;

    constructor(private dbService: DataBase) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds)
    }

    async createUser(user: IUserDTO): Promise<IUserDTO> {
        try {
            const hashedPassword = this.hashPassword(user.password);
            if (!hashedPassword) {
                throw new Error("Ocurrio un error al hashear la contrasenia");
            }
            // const resultQuery: ResultSetHeader = await this.dbService.executeQuery(
            //Crear las queries de la tabla de usuarios de la base de datos
            // )
            return

        } catch { }
    }
}
