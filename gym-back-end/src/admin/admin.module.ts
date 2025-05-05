import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminControllerController } from './controllers/admin-controller.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [],
  controllers: [AdminControllerController],
  providers: [JwtAuthGuard, AdminService],
  exports: [],
})
export class AdminModule { }
