import { Controller, HttpStatus, InternalServerErrorException, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logout')
export class LogoutController {

    constructor() { }

    @Post('')
    logOut(@Res() res: Response): Response {
        try {
            res.clearCookie('accessToken');
            return res.status(HttpStatus.OK).send({ message: 'Usuario deslogeado correctamente' });
        } catch (error) {
            console.error("Controllador de logout error", error)
            throw new InternalServerErrorException("Ocurrio un error al deslogear al usuario");
        }
    }
}
