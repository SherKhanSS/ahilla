import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from './dto/create-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() tagDto: CreateTagsDto) {
    return this.tagsService.createTag(tagDto);
  }

  @Get('for-main')
  getForMain() {
    return this.tagsService.getTagForMainPage();
  }

  @Put(':id')
  update(@Body() tagDto: CreateTagsDto, @Param() params) {
    return this.tagsService.updateTag(params.id, tagDto);
  }

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
}
