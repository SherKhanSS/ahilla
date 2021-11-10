import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePagesDto } from './dto/create-pages.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  update(@Body() tagDto: CreatePagesDto, @Param() params) {
    return this.pagesService.updatePage(params.slug, tagDto);
  }

  @Get(':slug')
  getOne(@Param() params) {
    return this.pagesService.getPageBySlug(params.slug);
  }
}
