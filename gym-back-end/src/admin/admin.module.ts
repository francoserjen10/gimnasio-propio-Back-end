import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [JwtAuthGuard, AdminService],
  exports: [],
})
export class AdminModule { }
