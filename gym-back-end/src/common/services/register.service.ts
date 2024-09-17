import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { IUserResponseDTO } from '../dto/userResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {
    saltRounds: number = 10;

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) { }

    async getAllUsers(): Promise<IUserDTO[]> {
        try {
            const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(userQueries.selectAll, []);
            const resultUsers = resultQuery.map((rs: RowDataPacket) => {
                return {
                    id: rs['usuario_id'],
                    name: rs['nombre'],
                    lastName: rs['apellido'],
                    phoneNumber: rs['numero_telefono'],
                    birthDate: rs['fecha_nacimiento'],
                    dni: rs['dni'],
                    email: rs['email'],
                    password: rs['contraseña'],
                    rolId: rs['rol_id'],
                    emergencyContact: rs['contacto_de_emergencia'],
                    direction: rs['contacto_de_emergencia']
                }
            }
            );
            return resultUsers;
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

    async createUser(user: IUserDTO): Promise<IUserResponseDTO> {
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
        console.log("response", response);
        return response
    }

    createToken(user: IUserResponseDTO) {
        try {
            const payload = { id: user.id, name: user.name, lastName: user.lastName, phoneNumber: user.phoneNumber, birthDate: user.birthDate, dni: user.dni, email: user.email, rolId: user.rolId, emergencyContact: user.emergencyContact, direction: user.direction };
            return {
                accessToken: this.jwtService.sign(payload)
            }
        } catch {
            throw new HttpException('El token no existe', HttpStatus.NOT_FOUND)
        }
    }
}
