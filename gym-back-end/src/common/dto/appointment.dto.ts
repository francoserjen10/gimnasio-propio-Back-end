import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AppointmentDto {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsInt()
    @IsNotEmpty()
    capacity: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;
}