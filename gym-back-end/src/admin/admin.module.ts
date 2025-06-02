import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [JwtAuthGuard, RolesGuard, AdminService],
  exports: [],
})
export class AdminModule { }
