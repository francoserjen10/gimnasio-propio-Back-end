import { Module } from '@nestjs/common';
import { RegisterService } from 'src/common/services/register.service';
import { DataBase } from './services/dataBase.service';
import { RegisterController } from './controllers/register.controller';

@Module({
    imports: [],
    controllers: [RegisterController],
    providers: [DataBase, RegisterService],
    exports: [],
})
export class CommonModule { }
