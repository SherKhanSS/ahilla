import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorsDto } from './dto/create-authors.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTagsDto } from '../tags/dto/create-tags.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() authorDto: CreateAuthorsDto) {
    return this.authorsService.createAuthor(authorDto);
  }

  @Put(':id')
  update(@Body() tagDto: CreateTagsDto, @Param() params) {
    return this.authorsService.updateAuthor(params.id, tagDto);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.authorsService.deleteAuthor(params.id);
  }

  @Get()
  getAll() {
    return this.authorsService.getAllAuthor();
  }
}
