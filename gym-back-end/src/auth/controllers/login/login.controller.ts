import { Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from '../../services/login/login.service';
import { RegisterService } from '../../services/register/register.service';
import { jwtDecode } from 'jwt-decode';
import { IUserResponse } from 'src/common/models/interfaces/user.interface';

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
            return res.status(HttpStatus.OK).send({
                message: 'Usuario logeado correctamente',
                user: {
                    usuario_id: user.usuario_id,
                    name: user.name,
                    lastName: user.lastName,
                    rolId: user.rolId
                }
            });
        } catch (error) {
            console.error("Controllador de login error", error)
            throw new HttpException("Usuario inexisente", HttpStatus.UNAUTHORIZED);
        }
    }

    @Get('/access/user')
    async getSessionUser(@Req() req: Request) {
        try {
            const token = await req.cookies?.accessToken;
            if (!token) {
                throw new UnauthorizedException('No existe token');
            }
            const decodedToken: IUserResponse = jwtDecode(token);
            return {
                user: {
                    usuario_id: decodedToken.usuario_id,
                    name: decodedToken.name,
                    lastName: decodedToken.lastName,
                    rolId: decodedToken.rolId
                }
            };
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            throw new HttpException("No autenticado", HttpStatus.UNAUTHORIZED);
        }
    }
}
