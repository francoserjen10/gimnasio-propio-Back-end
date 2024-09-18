import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity('turno')
export class Appointment {

    @PrimaryGeneratedColumn({
        name: 'turno_id',
        type: 'int'
    })
    public appointmentId: number;

    @Column({
        name: 'horario',
        type: 'time'
    })
    public time: Date;

    @Column({
        name: 'capacidad',
        type: 'int'
    })
    public capacity: number;

    @OneToMany(() => Booking, (bk) => bk.appointment)
    public booking: Booking[];

    // Un usuario puede tener muchas reservas, pero cada reserva pertenece a un solo usuario
    
}