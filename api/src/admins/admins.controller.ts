import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminsService } from './admins.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() adminDto: CreateAdminDto) {
    return this.adminsService.createAdmin(adminDto);
  }
}
