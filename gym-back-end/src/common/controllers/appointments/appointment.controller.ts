import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { IAppointment } from 'src/common/models/interfaces/appointment.interface';
import { AppointmentService } from 'src/common/services/appointments/appointment.service';

@Controller('appointment')
export class AppointmentController {
    private readonly logger = new Logger(AppointmentController.name);

    constructor(private appointmentService: AppointmentService) { }

    @Post()
    async createDailyAppointment(@Body() body: { firstDate: string; secondDate: string }): Promise<IAppointment[]> {
        try {
            const { firstDate, secondDate } = body;
            return await this.appointmentService.createDailyAppointment(firstDate, secondDate);
        } catch (error) {
            this.logger.error('Error creando los appointments', error.stack);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'No se pudieron crear los appointments',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
