import { Injectable } from '@nestjs/common';
import { DataBase } from './dataBase.service';

@Injectable()
export class RegisterService {
    constructor(dbService: DataBase) { }

    
}
