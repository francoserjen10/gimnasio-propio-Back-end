import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { RegisterController } from './controllers/register/register.controller';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { User } from 'src/common/models/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LogoutController } from './controllers/logout/logout.controller';
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [RegisterController, LoginController, LogoutController],
    providers: [RegisterService, LoginService],
})
export class AuthModule { }
