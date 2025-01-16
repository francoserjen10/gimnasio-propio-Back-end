import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../../services/auth/login.service';
import { RegisterService } from '../../services/auth/register.service';
import { Response } from 'express';

@Controller('/login')
export class LoginController {

    constructor(private loginService: LoginService, private registerService: RegisterService) { }

    @Post('/access')
    async login(@Body() body: { email: string, password: string }, @Res() res: Response) {
        try {
            const user = await this.loginService.validateUser(body.email, body.password);
            const { accessToken } = this.registerService.createToken(user);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24) //va a expirar en 1 dia
            })
            return res.status(HttpStatus.OK).send({ message: 'Usuario logeado correctamente' });
        } catch (error) {
            console.error("Controllador de login error", error)
            throw new HttpException("Usuario inexisente", HttpStatus.UNAUTHORIZED);
        }
    }

    @Get('/user-role')
    getUserRole(@Req() req): { rolId: number } | null {
        try {
            const token: string = req.cookies['accessToken'];
            return this.loginService.getUserRole(token);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new HttpException(
                'Ocurrio un error al obtener el rol del usuario a travez del token',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
