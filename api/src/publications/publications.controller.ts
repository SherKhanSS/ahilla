import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('publications')
export class PublicationsController {
  constructor(private publicationsService: PublicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() publicationDto: CreatePublicationsDto) {
    return this.publicationsService.createPublication(publicationDto);
  }

  @Get()
  getAll() {
    return this.publicationsService.getAllPublication();
  }
}
