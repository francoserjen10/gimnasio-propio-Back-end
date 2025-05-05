import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './models/entities/appointment.entity';
import { Booking } from './models/entities/booking.entity';
import { AppointmentService } from './services/appointments/appointment.service';
import { AppointmentController } from './controllers/appointments/appointment.controller';
import { BookingController } from './controllers/bookings/booking.controller';
import { BookingService } from './services/bookings/booking.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const result = dotenv.config();

if (result.error) {
    throw result.error
}

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment, Booking]),
    ],
    controllers: [AppointmentController, BookingController],
    providers: [AppointmentService, BookingService, JwtAuthGuard],
    exports: [JwtAuthGuard],
})
export class CommonModule { }
