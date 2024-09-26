import { IsInt, IsOptional } from "class-validator";

export class Booking {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsInt()
    @IsOptional()
    appointmentId?: number;

    @IsInt()
    @IsOptional()
    userId?: number;

    // @IsDateString()
    // @IsNotEmpty()
    // date: string;
}
