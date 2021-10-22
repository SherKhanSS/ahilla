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

  @Get('for-main')
  getForMain() {
    return this.tagsService.getTagForMainPage();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() tagDto: CreateTagsDto, @Param() params) {
    return this.tagsService.updateTag(params.id, tagDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params) {
    return this.tagsService.deleteTag(params.id);
  }

  @Get('publications/:id/:start/:end/:increase/:sort')
  getPublications(@Param() params) {
    return this.tagsService.getTagPublications(
      params.id,
      params.start,
      params.end,
      params.increase,
      params.sort,
    );
  }

  @Get()
  getAll() {
    return this.tagsService.getAllTag();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param() params) {
    return this.tagsService.getTagById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins/list/:start')
  getAllForAdmin(@Param() params) {
    return this.tagsService.getTagsForAdminList(params.start);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:str')
  search(@Param() params) {
    return this.tagsService.getTagsByString(params.str);
  }
}
