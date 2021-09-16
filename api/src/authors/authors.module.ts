import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { AuthModule } from '../auth/auth.module';
import { Publication } from '../publications/publications.model';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  imports: [SequelizeModule.forFeature([Author, Publication]), AuthModule],
})
export class AuthorsModule {}
