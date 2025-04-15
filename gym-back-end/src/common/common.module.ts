import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { Appointment } from './models/entities/appointment.entity';
import { Booking } from './models/entities/booking.entity';
import { AppointmentService } from './services/appointments/appointment.service';
import { AppointmentController } from './controllers/appointments/appointment.controller';
import { BookingController } from './controllers/bookings/booking.controller';
import { BookingService } from './services/bookings/booking.service';

const result = dotenv.config();

if (result.error) {
    throw result.error
}

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment, Booking]),
    ],
    controllers: [AppointmentController, BookingController],
    providers: [AppointmentService, BookingService],
    exports: [],
})
export class CommonModule { }
