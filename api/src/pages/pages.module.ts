import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './pages.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PagesService],
  controllers: [PagesController],
  imports: [SequelizeModule.forFeature([Page]), AuthModule],
})
export class PagesModule {}
