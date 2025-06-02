import { Controller, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
export class AdminController { }
