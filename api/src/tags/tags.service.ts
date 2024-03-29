import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagsDto } from './dto/create-tags.dto';
import { Tag } from './tags.model';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { MeiliSearch } from 'meilisearch';
import { Op, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

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
  tagsForMain = [];
  sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
    },
  );

  constructor(
    @InjectModel(Tag) private tagRepository: typeof Tag,
    @InjectMeiliSearch() private readonly meiliSearch: MeiliSearch,
  ) {}

  async createTag(dto: CreateTagsDto) {
    const tag = await this.tagRepository.create(dto);
    const index = this.meiliSearch.index('tags');
    await index.addDocuments([tag]);
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

    const index = this.meiliSearch.index('tags');
    await index.updateDocuments([tag]);

    return { status: HttpStatus.CREATED };
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepository.findByPk(id);

    if (!tag) {
      throw new HttpException('Тэг не найден.', HttpStatus.NOT_FOUND);
    }

    await tag.destroy();

    const index = this.meiliSearch.index('tags');
    await index.deleteDocument(id);

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
        where: {
          is_published: true,
          date: {
            [Op.lt]: new Date(),
          },
        },
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

  async getTagForMainPage(isTimer = false) {
    if (this.tagsForMain.length === 0 || isTimer) {
      this.tagsForMain = await this.sequelize.query(
        'select * from "tags" left join (select "tag_id" from (select count("publication_id") as "publications", "tag_id" from "publications_tags" group by "tag_id" order by "publications" DESC LIMIT 20) as t) as j on tags.id = j.tag_id where j.tag_id is Not NULL',
        {
          type: QueryTypes.SELECT,
        },
      );
      console.log('Топ тегов обновлен');
    }
    return this.tagsForMain;
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
    const index = this.meiliSearch.index('tags');
    const search = await index.search(str, {
      limit: 10,
    });

    if (search.hits.length === 0) {
      return { status: HttpStatus.NOT_FOUND };
    }

    return search.hits;
  }

  async fillMeiliSearchTags() {
    const index = this.meiliSearch.index('tags');
    const tags = await this.tagRepository.findAll({
      attributes: ['id', 'name', 'slug'],
    });
    const response = await index.addDocuments(tags);
    console.log('Теги внесены в поиск, id - ', response.updateId);
    return { MeiliSearch: response };
  }
}
