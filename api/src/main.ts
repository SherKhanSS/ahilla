import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PublicationsService } from './publications/publications.service';
import { TagsService } from './tags/tags.service';
import { AuthorsService } from './authors/authors.service';
import { DocumentsService } from './documents/documents.service';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  const publicationsService = app.get(PublicationsService);
  const tagsService = app.get(TagsService);
  const authorsService = app.get(AuthorsService);
  const documentsService = app.get(DocumentsService);

  await publicationsService.fillMeiliSearchPublications();
  await tagsService.fillMeiliSearchTags();
  await authorsService.fillMeiliSearchAuthors();
  await documentsService.fillMeiliSearchDocuments();

  setInterval(
    async () => await publicationsService.fillMeiliSearchPublications(),
    1000 * 60 * 60 * 24,
  );
}

//TODO cors врубить, блять!!!

start();
