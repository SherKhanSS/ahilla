import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admins.model';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports: [SequelizeModule.forFeature([Admin])],
  exports: [AdminsService],
})
export class AdminsModule {}
