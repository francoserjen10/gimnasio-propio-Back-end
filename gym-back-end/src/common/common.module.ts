import { Module } from '@nestjs/common';
import { RegisterService } from 'src/common/services/register.service';
import { DataBase } from './services/dataBase.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DataBase, RegisterService],
    exports: [],
})
export class CommonModule { }
