import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagsDto } from './dto/create-tags.dto';
import { Tag } from './tags.model';
import { Op } from 'sequelize';

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
    await this.tagRepository.create(dto);
    return { status: HttpStatus.CREATED };
  }

  async updateTag(id: string, dto: CreateTagsDto) {
    const tag = await this.tagRepository.findByPk(id);

    if (!tag) {
      throw new HttpException('Тэг не найден.', HttpStatus.NOT_FOUND);
    }

    tag.name = dto.name || tag.name;
    tag.slug = dto.slug || tag.slug;

    await tag.save();
    return { status: HttpStatus.CREATED };
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepository.findByPk(id);

    if (!tag) {
      throw new HttpException('Тэг не найден.', HttpStatus.NOT_FOUND);
    }

    await tag.destroy();
    return { status: HttpStatus.OK };
  }

  async getAllTag() {
    return await this.tagRepository.findAll();
  }

  async getTagByIds(ids) {
    return await this.tagRepository.findAll({
      where: {
        id: ids,
      },
    });
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

  async getTagsForAdminList(start) {
    const { count, rows } = await this.tagRepository.findAndCountAll({
      order: [['name', 'ASC']],
      offset: +start,
      limit: 30,
      attributes: ['id', 'name'],
    });

    return { count, tags: rows };
  }

  async getTagById(id) {
    return await this.tagRepository.findByPk(+id);
  }

  async getTagsByString(str) {
    let tags = await this.tagRepository.findAll({
      order: [['name', 'ASC']],
      where: {
        name: {
          [Op.substring]: str,
        },
      },
    });

    if (tags.length === 0) {
      tags = await this.tagRepository.findAll({
        order: [['name', 'ASC']],
        where: {
          slug: {
            [Op.substring]: str,
          },
        },
      });
    }

    return tags;
  }
}
