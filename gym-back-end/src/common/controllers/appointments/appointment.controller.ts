import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentDto } from 'src/common/dto/appointment.dto';
import { AppointmentService } from 'src/common/services/appointments/appointment.service';

@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService:AppointmentService) {}

    @Post()
    async createDailyAppointment(@Body() createAppointmentDto: AppointmentDto) {
        const { date } = createAppointmentDto;
        return this.appointmentService.createDailyAppointment(date);
    }
}
