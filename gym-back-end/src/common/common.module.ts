import { Module } from '@nestjs/common';
import { RegisterService } from 'src/common/services/register.service';
import { DataBase } from './services/dataBase.service';
import { RegisterController } from './controllers/register.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';
import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    throw result.error
}

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [RegisterController, LoginController],
    providers: [DataBase, RegisterService, LoginService],
    exports: [],
})
export class CommonModule { }
