import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../admins/admins.model';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}
  async login(adminDto: CreateAdminDto) {
    const admin = await this.validateAdmin(adminDto);
    return this.generateToken(admin);
  }

  async registration(adminDto: CreateAdminDto) {
    const hashPassword = await bcrypt.hash(adminDto.password, 5);
    const admin = await this.adminsService.createAdmin({
      ...adminDto,
      password: hashPassword,
    });
    return this.generateToken(admin);
  }

  private async generateToken(admin: Admin) {
    const payload = { email: admin.email, id: admin.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateAdmin(adminDto: CreateAdminDto) {
    const admin = await this.adminsService.getAdminByEmail(adminDto.email);
    const passwordEquals = await bcrypt.compare(
      adminDto.password,
      admin.password,
    );
    if (admin && passwordEquals) {
      return admin;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
