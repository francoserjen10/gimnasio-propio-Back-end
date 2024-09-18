import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reserva')
export class User {

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
}