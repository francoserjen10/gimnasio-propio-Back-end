import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ClientService } from './services/client.service';

@Module({
  controllers: [ClientController],
    providers: [JwtAuthGuard, ClientService],
})
export class ClientModule {}
