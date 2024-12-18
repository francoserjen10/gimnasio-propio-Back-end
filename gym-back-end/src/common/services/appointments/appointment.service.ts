import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/common/models/entities/appointment.entity';
import { IAppointment } from 'src/common/models/interfaces/appointment.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
    private readonly logger = new Logger(AppointmentService.name);

    constructor(@InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>) { }

    async createDailyAppointment(firstDate: string, secondDate: string): Promise<IAppointment[]> {
        try {
            const startDate = new Date(firstDate); // UTC
            const endDate = new Date(secondDate);
            const startHour = 8;
            const endHour = 22;
            const appointmentDuration = 2;
            const appointments: Appointment[] = [];
            while (startDate <= endDate) {
                const formattedDate = startDate.toISOString().split('T')[0];
                const existingAppointment: IAppointment[] | [] = await this.appointmentRepository.find({
                    where: { date: formattedDate }
                });
                if (existingAppointment.length > 0) {
                    this.logger.warn(`Appointments con fecha ${formattedDate} ya existe`);
                    startDate.setDate(startDate.getDate() + 1);
                    continue;
                }
                for (let hour = startHour; hour <= endHour; hour += appointmentDuration) {
                    const appointmentDate = new Date(startDate);
                    appointmentDate.setHours(hour, 0, 0, 0);
                    const appointment = new Appointment();
                    appointment.date = formattedDate
                    appointment.time = appointmentDate.toTimeString().split(' ')[0];
                    appointment.capacity = 25;
                    appointments.push(appointment);
                }
                if (appointments.length > 0) {
                    await this.appointmentRepository.save(appointments);
                    this.logger.log(`Appointments con fecha ${formattedDate} creado con exito!`);
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            if (appointments.length === 0) {
                this.logger.warn('No se pudieron crear appointments en el rango de fechas proporcionado');
                throw new HttpException('No se pudieron crear appointments, ya existen en todas las fechas solicitadas', HttpStatus.CONFLICT);
            }
            return appointments;
        } catch (error) {
            this.logger.error('Falló la creación diaria de los appointments', error.stack,);
            if (error instanceof HttpException) { throw error; }
            throw new HttpException('Error al crear los appointments diarios', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
