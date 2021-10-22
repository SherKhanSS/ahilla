import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('publications')
export class PublicationsController {
  constructor(private publicationsService: PublicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() publicationDto: CreatePublicationsDto) {
    return this.publicationsService.createPublication(publicationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() publicationDto: CreatePublicationsDto, @Param() params) {
    return this.publicationsService.updatePublication(
      params.id,
      publicationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params) {
    return this.publicationsService.deletePublication(params.id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  getOneById(@Param() params) {
    return this.publicationsService.getPublicationById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins/list/:start')
  getFullList(@Param() params) {
    return this.publicationsService.getPublicationsForAdminList(params.start);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins/status/:id')
  setStatus(@Param() params) {
    return this.publicationsService.setPublished(params.id);
  }
}
