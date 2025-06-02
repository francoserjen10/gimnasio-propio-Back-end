import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ClientService } from './services/client.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  controllers: [ClientController],
  providers: [JwtAuthGuard, RolesGuard, ClientService],
})
export class ClientModule { }
