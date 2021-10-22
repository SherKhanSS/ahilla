import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() adminDto: CreateAdminDto) {
    return this.authService.login(adminDto);
  }

  @Post('/registration')
  registration(@Body() adminDto: CreateAdminDto) {
    return this.authService.registration(adminDto);
  }

  //TODO в проде этой ручки быть не должно

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  check() {
    return this.authService.checkAuth();
  }
}
