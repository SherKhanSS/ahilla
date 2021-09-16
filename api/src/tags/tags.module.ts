import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publication } from '../publications/publications.model';
import { Tag } from './tags.model';
import { PublicationsTags } from '../publications/publications-tags.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [
    SequelizeModule.forFeature([Tag, Publication, PublicationsTags]),
    AuthModule,
  ],
})
export class TagsModule {}
