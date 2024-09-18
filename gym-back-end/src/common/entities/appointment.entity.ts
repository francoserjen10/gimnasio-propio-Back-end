import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Booking, (bk) => bk.reservas)
    public turno: Booking

    // Un usuario puede tener muchas reservas, pero cada reserva pertenece a un solo usuario
    
}