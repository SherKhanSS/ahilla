import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admins.model';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}
  async createAdmin(dto: CreateAdminDto) {
    return await this.adminRepository.create(dto);
  }

  async getAdminByEmail(email: string) {
    return await this.adminRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
