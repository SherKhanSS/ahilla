import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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

  @Get(':id')
  getOneById(@Param() params) {
    return this.publicationsService.getPublicationById(params.id);
  }
}
