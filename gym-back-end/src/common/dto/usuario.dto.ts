import { IsDate, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

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

    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date;

    @IsInt()
    @IsNotEmpty()
    dni: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Min(5)
    @Max(15)
    password: string;

    @IsString()
    @IsOptional()
    urlImage: string;

    @IsInt()
    @IsNotEmpty()
    rolId: number;
}