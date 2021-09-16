import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() tagDto: CreateTagsDto) {
    return this.tagsService.createTag(tagDto);
  }

  @Get()
  getAll() {
    return this.tagsService.getAllTag();
  }
}
