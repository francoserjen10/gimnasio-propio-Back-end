import { IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class IUserDTO {

    @IsInt()
    @IsOptional()
    id: number;

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
    urlImage: string;

    @IsInt()
    @IsNotEmpty()
    rolId: number;
}