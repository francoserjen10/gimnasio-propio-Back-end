import { Body, Controller, Post } from '@nestjs/common';
import { IBooking } from 'src/common/models/interfaces/booking.interface';
import { BookingService } from 'src/common/services/bookings/booking.service';

@Controller('booking')
export class BookingController {

    constructor(private bookingServices: BookingService) { }

    @Post()
    async createBooking(@Body('appointmentId') appointmentId: number, @Body('userId') userId: number): Promise<IBooking> {
        try {
            return await this.bookingServices.createBooking(appointmentId, userId);
        } catch (error) {
            throw error;
        }
    }
}
