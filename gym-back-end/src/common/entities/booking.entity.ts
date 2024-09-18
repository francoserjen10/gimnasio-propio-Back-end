import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";

@Entity('reserva')
export class Booking {

    @PrimaryGeneratedColumn({
        name: 'reserva_id',
        type: 'int'
    })
    public bookingId: number;

    @Column({
        name: 'turno_id',
        type: 'int'
    })
    public appointmentId: number;

    @Column({
        name: 'usuario_id',
        type: 'int'
    })
    public userId: number;

    @Column({
        name: 'fecha_reserva',
        type: 'date'
    })
    public bookingDate: Date;

    // Un turno puede tener muchas reservas, pero cada reserva corresponde a un solo turno
    @ManyToOne(() => Appointment, (apt) => apt.booking)
    public appointment: Appointment;
}