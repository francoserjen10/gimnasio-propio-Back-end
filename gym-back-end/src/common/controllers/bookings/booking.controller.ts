import { Body, Controller, Delete, Post } from '@nestjs/common';
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

    @Delete()
    async deleteBooking(@Body('bookingId') bookingId: number) {
        try {
            return await this.bookingServices.deleteBooking(bookingId);
        } catch (error) {
            throw error;
        }
    }
}
