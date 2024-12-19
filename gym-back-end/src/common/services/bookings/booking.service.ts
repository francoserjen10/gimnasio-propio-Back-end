import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/common/models/entities/appointment.entity';
import { Booking } from 'src/common/models/entities/booking.entity';
import { IAppointment } from 'src/common/models/interfaces/appointment.interface';
import { IBooking } from 'src/common/models/interfaces/booking.interface';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
    private readonly logger = new Logger(BookingService.name);

    constructor
        (
            @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
            @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>
        ) { }

    // crear una reserva de un turno (appointments)
    async createBooking(appointmentId: number, userId: number): Promise<IBooking> {
        try {
            const appointment: IAppointment = await this.verifyIfExistAppointment(appointmentId);
            await this.verifyIfExistUserInBooking(appointmentId, userId);
            const newBoking: Booking = this.bookingRepository.create({
                appointmentId,
                userId,
                bookingDate: appointment.date,
                bookingTime: appointment.time
            });
            const savedBooking = await this.bookingRepository.save(newBoking);
            this.logger.log(`Reserva creada exitosamente con id ${(await savedBooking).bookingId} para turno ${appointmentId}`)
            appointment.capacity -= 1;
            await this.appointmentRepository.save(appointment);
            this.logger.log(`Capacidad actualizada para el turno con id ${appointmentId}, nueva capacidad: ${appointment.capacity}`);
            return savedBooking;
        } catch (error) {
            this.logger.error('Falló la creación la reserva', error.stack,);
            if (error instanceof HttpException) { throw error; }
            throw new HttpException('Error al crear la reserva', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verifyIfExistAppointment(appointmentId: number): Promise<IAppointment> {
        try {
            const appointment: IAppointment = await this.appointmentRepository.findOne({ where: { appointmentId: appointmentId } });
            if (!appointment) {
                this.logger.warn(`Turno con id ${appointmentId} no se encontro`);
                throw new NotFoundException(`Turno con id ${appointmentId} no existe`);
            }
            if (appointment.capacity <= 0) {
                this.logger.warn(`No hay capacidad disponible en el turno con id ${appointmentId}`);
                throw new BadRequestException(`Capacidad insuficiente para el turno con id ${appointmentId}`);
            }
            return appointment;
        } catch (error) {
            this.logger.error(`Error al verificar el turno con id ${appointmentId}`, error.stack);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al verificar el turno', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verifyIfExistUserInBooking(appointmentId: number, userId: number): Promise<IBooking> {
        try {
            const existUserInBooking: IBooking = await this.bookingRepository.findOne({ where: { appointmentId: appointmentId, userId: userId } });
            if (existUserInBooking) {
                this.logger.warn(`Usuario con id ${userId} ya tiene reserva en el turno ${appointmentId}`);
                throw new ConflictException(`Usuario con id ${userId} ya existe`);
            }
            return existUserInBooking;
        } catch (error) {
            this.logger.error(`Error al verificar la reserva del usuario con id ${userId} en el turno ${appointmentId}`, error.stack);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Error al verificar la reserva del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
