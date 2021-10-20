import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PublicationsModule } from './publications/publications.module';
import { ConfigModule } from '@nestjs/config';
import { Publication } from './publications/publications.model';
import { TagsModule } from './tags/tags.module';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/authors.model';
import { Tag } from './tags/tags.model';
import { PublicationsTags } from './publications/publications-tags.model';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/admins.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Publication, Tag, Author, PublicationsTags, Admin],
      autoLoadModels: true,
    }),
    PublicationsModule,
    TagsModule,
    AuthorsModule,
    AuthModule,
    AdminsModule,
  ],
})
export class AppModule {}
