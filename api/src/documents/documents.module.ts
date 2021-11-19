import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './documents.model';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [DocumentsService],
  controllers: [DocumentsController],
  imports: [SequelizeModule.forFeature([Document]), AuthModule, FilesModule],
  exports: [DocumentsService],
})
export class DocumentsModule {}
