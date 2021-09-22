import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorsDto } from './dto/create-authors.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() authorDto: CreateAuthorsDto) {
    return this.authorsService.createAuthor(authorDto);
  }

  @Get()
  getAll() {
    return this.authorsService.getAllAuthor();
  }
}
