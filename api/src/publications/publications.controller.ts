import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('publications')
export class PublicationsController {
  constructor(private publicationsService: PublicationsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() publicationDto: CreatePublicationsDto, @UploadedFile() image) {
    return this.publicationsService.createPublication(publicationDto, image);
  }

  @Post('add-image')
  @UseInterceptors(FileInterceptor('image'))
  createImage(@UploadedFile() image) {
    return this.publicationsService.createImage(image);
  }

  @Get('news/:offset/:limit/:increase/:sort')
  getNews(@Param() params) {
    return this.publicationsService.getNewsFromPublication(
      params.offset,
      params.limit,
      params.increase,
      params.sort,
    );
  }

  @Get('articles/:offset/:limit/:increase/:sort')
  getArticles(@Param() params) {
    return this.publicationsService.getArticlesFromPublication(
      params.offset,
      params.limit,
      params.increase,
      params.sort,
    );
  }

  @Get('authors/:id/:offset/:limit/:increase/:sort')
  getAuthorsPublications(@Param() params) {
    return this.publicationsService.getAuthorsPublications(
      params.id,
      params.offset,
      params.limit,
      params.increase,
      params.sort,
    );
  }

  @Get('archives/:id/:offset/:limit/:increase/:sort')
  getPublicationsByDate(@Param() params) {
    return this.publicationsService.getPublicationsByDate(
      params.id,
      params.offset,
      params.limit,
      params.increase,
      params.sort,
    );
  }

  @Get('search/:str')
  search(@Param() params) {
    return this.publicationsService.getPublicationsByString(params.str);
  }

  @Get('dates')
  getDates() {
    return this.publicationsService.getDateMark();
  }

  // @Get('tags/:id/:offset/:limit/:increase/:sort')
  // getTagsPublications(@Param() params) {
  //   return this.publicationsService.getTagsPublications(
  //     params.id,
  //     params.offset,
  //     params.limit,
  //     params.increase,
  //     params.sort,
  //   );
  // }

  // @Get(':id')
  // getOneById(@Param() params) {
  //   return this.publicationsService.getPublicationById(params.id);
  // }

  @Get('main-news')
  getMainNews() {
    return this.publicationsService.getNewsForMainPage();
  }

  @Get('main-articles')
  getMainArticles() {
    return this.publicationsService.getArticlesForMainPage();
  }

  @Get('main-mobile')
  getMobilePublications() {
    return this.publicationsService.getPublicationsForMobileMainPage();
  }

  @Get('populars')
  getPopulars() {
    return this.publicationsService.getPopularsPublication();
  }

  @Get(':slug')
  getOneBySlug(@Param() params) {
    return this.publicationsService.getPublicationBySlug(params.slug);
  }
}
