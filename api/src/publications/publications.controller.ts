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

  @Get('news/:offset/:limit')
  getNews(@Param() params) {
    return this.publicationsService.getNewsFromPublication(
      params.offset,
      params.limit,
    );
  }

  @Get('articles/:offset/:limit')
  getArticles(@Param() params) {
    return this.publicationsService.getArticlesFromPublication(
      params.offset,
      params.limit,
    );
  }

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

  @Get('populars')
  getPopulars() {
    return this.publicationsService.getPopularsPublication();
  }

  @Get(':slug')
  getOneBySlug(@Param() params) {
    return this.publicationsService.getPublicationBySlug(params.slug);
  }
}
