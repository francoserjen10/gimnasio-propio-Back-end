import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';

@Controller('/login')
export class LoginController {

    constructor(private loginService: LoginService, private registerService: RegisterService) { }

    @Post('/access')
    async login(@Body() body: { email: string, password: string }) {
        try {
            const user = await this.loginService.validateUser(body.email, body.password);
            console.log("response", user);
            return this.registerService.createToken(user);
        } catch (error) {
            console.error("Controllador de login error", error)
            throw new HttpException("Usuario inexisente", HttpStatus.UNAUTHORIZED);
        }
    }
}
