import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class User {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    public usuario_id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: 50
    })
    public name: string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        length: 50
    })
    public lastName: string;

    @Column({
        name: 'numero_telefono',
        type: 'varchar',
        length: 50
    })
    public phoneNumber: string;

    @Column({
        name: 'fecha_nacimiento',
        type: 'date'
    })
    public birthDate: Date;

    @Column({
        name: 'dni',
        type: 'int'
    })
    public dni: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 150
    })
    public email: string;

    @Column({
        name: 'contraseña',
        type: 'varchar',
        length: 150
    })
    public password: string;

    @Column({
        name: 'url_image',
        type: 'varchar',
        length: 255
    })
    public urlImage?: string;

    @Column({
        name: 'url_image_delete',
        type: 'varchar',
        length: 255
    })
    public urlImageDelete?: string;

    @Column({
        name: 'display_url_image',
        type: 'varchar',
        length: 255
    })
    public displayUrlImage?: string;

    @Column({
        name: 'rol_id',
        type: 'int'
    })
    public rolId: number;

    @Column({
        name: 'contacto_de_emergencia',
        type: 'varchar',
        length: 50
    })
    public emergencyContact: string;

    @Column({
        name: 'dirección',
        type: 'varchar',
        length: 50
    })
    public direction: string;
}