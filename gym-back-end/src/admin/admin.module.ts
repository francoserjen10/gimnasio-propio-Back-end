import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminService } from './services/admin.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [JwtAuthGuard, RolesGuard, AdminService],
  exports: [],
})
export class AdminModule { }
