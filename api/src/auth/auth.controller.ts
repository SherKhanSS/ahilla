import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { AuthService } from './auth.service';

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
}
