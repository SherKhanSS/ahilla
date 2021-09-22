import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publication } from './publications.model';
import { Tag } from '../tags/tags.model';
import { PublicationsTags } from './publications-tags.model';
import { AuthModule } from '../auth/auth.module';
import { Author } from '../authors/authors.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService],
  imports: [
    SequelizeModule.forFeature([Publication, Tag, PublicationsTags, Author]),
    AuthModule,
    FilesModule,
  ],
})
export class PublicationsModule {}
