import { Module } from '@nestjs/common';
import { RegisterService } from 'src/common/services/register.service';
import { DataBase } from './services/dataBase.service';
import { RegisterController } from './controllers/register.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const result = dotenv.config();

if (result.error) {
    throw result.error
}

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: false,
            entities: ['dist/**/*.entity.js'],
            // logging: 'all',
        }),
        TypeOrmModule.forFeature([User]),
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
