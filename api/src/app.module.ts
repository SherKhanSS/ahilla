import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PublicationsModule } from './publications/publications.module';
import { ConfigModule } from '@nestjs/config';
import { Publication } from './publications/publications.model';
import { TagsModule } from './tags/tags.module';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/authors.model';
import { Tag } from './tags/tags.model';
import { Document } from './documents/documents.model';
import { PublicationsTags } from './publications/publications-tags.model';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/admins.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MeiliSearchModule } from 'nestjs-meilisearch';
import { DocumentsModule } from './documents/documents.module';
import { PagesModule } from './pages/pages.module';
import { Page } from './pages/pages.model';

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
      models: [
        Publication,
        Tag,
        Author,
        PublicationsTags,
        Admin,
        Document,
        Page,
      ],
      autoLoadModels: true,
    }),
    MeiliSearchModule.forRootAsync({
      useFactory: () => ({
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_PRIVATE_KEY,
      }),
    }),
    PublicationsModule,
    TagsModule,
    AuthorsModule,
    AuthModule,
    AdminsModule,
    DocumentsModule,
    PagesModule,
  ],
})
export class AppModule {}
