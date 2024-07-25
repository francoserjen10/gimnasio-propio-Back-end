import { Module } from '@nestjs/common';
import { RegisterService } from 'src/common/services/register.service';
import { DataBase } from './services/dataBase.service';
import { RegisterController } from './controllers/register.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '60s'},
        })
    ],
    controllers: [RegisterController],
    providers: [DataBase, RegisterService],
    exports: [],
})
export class CommonModule { }
