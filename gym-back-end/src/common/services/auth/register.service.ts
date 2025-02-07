import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/entities/user.entity';
import { Repository } from 'typeorm';
import { IUser, IUserResponse } from 'src/common/models/interfaces/user.interface';
import { error } from 'console';

@Injectable()
export class RegisterService {
    private readonly logger = new Logger(RegisterService.name);

    saltRounds: number = 10;

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) { }

    async updateUserById(id: number, user: IUser): Promise<IUser> {
        try {
            this.logger.log(`Iniciando actualización del usuario con id: ${id}`);
            const existingUser = await this.userRepository.findOneBy({ usuario_id: id });
            if (existingUser === null) {
                this.logger.warn(`Usuario con id ${id} no encontrado`);
                throw new HttpException(`Usuario con id ${id} no encontrado`, HttpStatus.NOT_FOUND);
            }
            const hashedPassword: string = await this.hashPassword(user.password);
            const userToUpdate = {
                ...existingUser,
                ...user,
                password: hashedPassword
            };
            const userUpdated = await this.userRepository.save(userToUpdate);
            return userUpdated;
        } catch (error) {
            this.logger.error(`Error al actualizar el usuario con id ${id}: ${error.message}`, error.stack);
            throw new HttpException(
                `Error inesperado al actualizar el usuario con el id ${id}: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
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

    async getUserById(id: number): Promise<IUserResponse | null> {
        try {
            const user: IUserResponse = await this.userRepository.findOneBy({ usuario_id: id });
            if (!user) {
                throw new HttpException(`No se encontró el usuario con el ID ${id}`, HttpStatus.NOT_FOUND);
            }
            return user;
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
            this.logger.log('Iniciando hash de la contraseña');
            return bcrypt.hash(password, this.saltRounds);
        } catch (error) {
            this.logger.error('Error al hashear la contraseña:', error.stack);
            throw new HttpException('Ocurrio un error al hashear la contraseña del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(user: IUser): Promise<IUserResponse> {
        try {
            const hashedPassword: string = await this.hashPassword(user.password);
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
