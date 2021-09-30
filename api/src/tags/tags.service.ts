import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagsDto } from './dto/create-tags.dto';
import { Tag } from './tags.model';

const checkAndFillDescriptionDeleteContent = (publications) => {
  publications.forEach((article) => {
    if (article.description === '') {
      article.description =
        article.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 360) + '...';
    }
    article.content = '';
  });
};

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  async createTag(dto: CreateTagsDto) {
    return await this.tagRepository.create(dto);
  }

  async getAllTag() {
    return await this.tagRepository.findAll();
  }

  async getTagPublications(id, start, end, increase, sort) {
    const { publications, name } = await this.tagRepository.findByPk(id, {
      include: {
        all: true,
      },
    });

    const count = publications.length;

    const sortPublication = publications.sort((a, b) => {
      if (+increase === 0) {
        return sort === 'views'
          ? b[sort] - a[sort]
          : Date.parse(b[sort]) - Date.parse(a[sort]);
      } else {
        return sort === 'views'
          ? a[sort] - b[sort]
          : Date.parse(a[sort]) - Date.parse(b[sort]);
      }
    });

    const articles = sortPublication.slice(start, end);

    checkAndFillDescriptionDeleteContent(articles);

    return { name, count, articles };
  }

  async getTagForMainPage() {
    return await this.tagRepository.findAll({
      offset: 0,
      limit: 20,
    });
  }
}
