import { Body, Controller, Post } from '@nestjs/common';
import { IAppointment } from 'src/common/models/interfaces/appointment.interface';
import { AppointmentService } from 'src/common/services/appointments/appointment.service';

@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService: AppointmentService) { }

    @Post()
    async createDailyAppointment(@Body() createAppointmentDto: IAppointment) {
        const { date } = createAppointmentDto;
        return this.appointmentService.createDailyAppointment(date);
    }
}
