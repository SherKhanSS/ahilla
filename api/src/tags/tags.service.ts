import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagsDto } from './dto/create-tags.dto';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}
  async createTag(dto: CreateTagsDto) {
    return await this.tagRepository.create(dto);
  }

  async getAllTag() {
    return await this.tagRepository.findAll({
      offset: 0,
      limit: 10,
    });
  }
}
