import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/common/entities/appointment.entity';
import { IAppointment } from 'src/common/models/interfaces/appointment.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {

    constructor(@InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>) { }

    async createDailyAppointment(date: string): Promise<IAppointment[]> {

        const startDate = new Date(date);
        console.log("startDate", startDate)

        const startHour = 8;
        const endHour = 21;
        const appointmentDuration = 1;

        const appointments: Appointment[] = [];

        for (let hour = startHour; hour < endHour; hour += appointmentDuration) {
            const appointmentDate = new Date(startDate);
            appointmentDate.setHours(hour, 0, 0, 0);

            const appointment = new Appointment;
            appointment.date = startDate.toISOString().split('T')[0];
            appointment.time = appointmentDate.toTimeString().split(' ')[0];;
            appointment.capacity = 25;

            appointments.push(appointment);

        }

        await this.appointmentRepository.save(appointments);
        return appointments;
    }
}
