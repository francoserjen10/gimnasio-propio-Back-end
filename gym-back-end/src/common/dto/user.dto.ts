import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserDTO {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: Date;

    @IsInt()
    @IsNotEmpty()
    dni: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(15)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    urlImage?: string;

    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    rolId: number;

    @IsString()
    @IsNotEmpty()
    emergencyContact: string;

    @IsString()
    @IsNotEmpty()
    direction: string;
}