import { Module } from '@nestjs/common';
import { RegisterService } from 'src/common/services/auth/register.service';
import { RegisterController } from './controllers/auth/register.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './services/auth/login.service';
import { LoginController } from './controllers/auth/login.controller';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { Appointment } from './models/entities/appointment.entity';
import { Booking } from './models/entities/booking.entity';
import { AppointmentService } from './services/appointments/appointment.service';
import { AppointmentController } from './controllers/appointments/appointment.controller';

const result = dotenv.config();

if (result.error) {
    throw result.error
}

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: false,
            entities: ['dist/**/*.entity.js'],
            // logging: 'all',
        }),
        TypeOrmModule.forFeature([User, Appointment, Booking]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [RegisterController, LoginController, AppointmentController],
    providers: [RegisterService, LoginService, AppointmentService],
    exports: [],
})
export class CommonModule { }
