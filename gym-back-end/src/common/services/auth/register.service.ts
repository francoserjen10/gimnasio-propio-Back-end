import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserResponse } from 'src/common/models/interfaces/user.interface';
import { error } from 'console';

@Injectable()
export class RegisterService {
    saltRounds: number = 10;

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) { }

    async getUserById(id: number): Promise<IUserResponse | null> {
        try {
            const user: IUserResponse = await this.userRepository.findOneBy({ usuario_id: id });
            if (!user) {
                throw new error;
            }
            return user;
        } catch (error) {
            throw new HttpException(`Ocurrió un error al ubicar el usuario con id ${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async getAllUsers(): Promise<IUser[]> {
        try {
            const users: User[] = await this.userRepository.find();
            return users;
        } catch {
            throw new HttpException("Error en la peticion a la base de datos", HttpStatus.BAD_REQUEST);
        }
    };

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, this.saltRounds);
        } catch (error) {
            console.error("Error al hashear la contrsenia:", error);
            throw new HttpException('Ocurrio un error al hashear la contraseña del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(user: IUser): Promise<IUserResponse> {
        try {
            const hashedPassword = await this.hashPassword(user.password);
            if (!hashedPassword) {
                // throw new Error("Ocurrio un error al hashear la contrasenia");
                throw new HttpException('Ocurrio un error al hashear la contraseña del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const existingUser = await this.checkIfUserExists(user);

            if (existingUser === null) {
                const newUser: User = await this.userRepository.create({
                    name: user.name,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    birthDate: user.birthDate,
                    dni: user.dni,
                    email: user.email,
                    rolId: user.rolId,
                    password: hashedPassword,
                    emergencyContact: user.emergencyContact,
                    direction: user.direction,
                });
                const result = await this.userRepository.save(newUser);
                return result;
            } else {
                throw new HttpException('El usuario que se quiere registrar ya existe', HttpStatus.CONFLICT)
            }

        } catch (error) {
            console.error("Error al crear el usuario:", error);
            throw new HttpException('Ocurrió un error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async checkIfUserExists(user: Partial<User>): Promise<User | null> {
        const response = await this.userRepository.findOne({
            where: {
                name: user.name,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                birthDate: user.birthDate,
                dni: user.dni,
                email: user.email,
                rolId: user.rolId,
                emergencyContact: user.emergencyContact,
                direction: user.direction
            }
        });
        return response
    }

    createToken(user: IUserResponse) {
        try {
            const payload = { id: user.usuario_id, name: user.name, lastName: user.lastName, phoneNumber: user.phoneNumber, birthDate: user.birthDate, dni: user.dni, email: user.email, rolId: user.rolId, emergencyContact: user.emergencyContact, direction: user.direction };
            return {
                accessToken: this.jwtService.sign(payload)
            }
        } catch {
            throw new HttpException('El token no existe', HttpStatus.NOT_FOUND)
        }
    }
}
