export interface IUser {
    usuario_id?: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    birthDate: Date;
    dni: number;
    email: string;
    password: string;
    urlImage?: string;
    rolId: number;
    emergencyContact: string;
    direction: string;
}

export type IUserResponse = Omit<IUser, 'password' | 'urlImage'>;