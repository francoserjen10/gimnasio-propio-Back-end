import {IUserDTO} from './user.dto';

export type IUserResponseDTO = Omit<IUserDTO, 'password' | 'urlImage'>;

// Esta interface fue creada para omitir la propiedad de password y no me de error cuando retorno un usuario pero sin devolver la password