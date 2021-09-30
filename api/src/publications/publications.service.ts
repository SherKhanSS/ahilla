import { Injectable } from '@nestjs/common';
import { Publication } from './publications.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { FilesService } from '../files/files.service';
import { Author } from '../authors/authors.model';
import { PublicationsTags } from './publications-tags.model';
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
export class PublicationsService {
  constructor(
    @InjectModel(Publication) private publicationRepository: typeof Publication,
    @InjectModel(PublicationsTags)
    private publicationsTagsRepository: typeof PublicationsTags,
    private fileService: FilesService,
  ) {}

  async createPublication(dto: CreatePublicationsDto, image) {
    const fileName = await this.fileService.createFile(image);
    return await this.publicationRepository.create({ ...dto, image: fileName });
  }

  async getNewsFromPublication(offset, limit, increase, sort) {
    const order = +increase === 0 ? 'DESC' : 'ASC';
    const validSort = sort ? sort : 'updated_at';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        is_news: true,
      },
      offset,
      limit,
      include: { all: true },
      distinct: true,
    });

    checkAndFillDescriptionDeleteContent(rows);

    return { count, news: rows };
  }

  async getArticlesFromPublication(offset, limit, increase, sort) {
    const order = +increase === 0 ? 'DESC' : 'ASC';
    const validSort = sort ? sort : 'updated_at';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        is_news: false,
      },
      offset,
      limit,
      include: { all: true },
      distinct: true,
    });

    checkAndFillDescriptionDeleteContent(rows);

    return { articles: rows, count };
  }

  async getAuthorsPublications(id, offset, limit, increase, sort) {
    const order = +increase === 0 ? 'DESC' : 'ASC';
    const validSort = sort ? sort : 'updated_at';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        author_id: id,
      },
      offset,
      limit,
      include: { all: true },
      distinct: true,
    });

    checkAndFillDescriptionDeleteContent(rows);

    return { articles: rows, count };
  }

  async getPublicationsByString(str) {
    console.log(str);
    let articles = await this.publicationRepository.findAll({
      order: [['updated_at', 'DESC']],
      where: {
        name: {
          [Op.substring]: str,
        },
      },
      offset: 0,
      limit: 10,
    });

    if (articles.length === 0) {
      articles = await this.publicationRepository.findAll({
        order: [['updated_at', 'DESC']],
        where: {
          slug: {
            [Op.substring]: str,
          },
        },
        offset: 0,
        limit: 10,
      });
    }

    if (articles.length === 0) {
      articles = await this.publicationRepository.findAll({
        order: [['updated_at', 'DESC']],
        where: {
          content: {
            [Op.substring]: str,
          },
        },
        offset: 0,
        limit: 10,
      });
    }

    checkAndFillDescriptionDeleteContent(articles);

    return articles;
  }

  // async getTagsPublications(id, offset, limit, increase, sort) {
  //   const order = +increase === 0 ? 'DESC' : 'ASC';
  //   const validSort = sort ? sort : 'updated_at';
  //   const { count, rows } =
  //     await this.publicationsTagsRepository.findAndCountAll({
  //       order: [[validSort, order]],
  //       where: {
  //         tag_id: id,
  //       },
  //       offset,
  //       limit,
  //       include: { all: true },
  //       distinct: true,
  //     });
  //
  //   checkAndFillDescriptionDeleteContent(rows);
  //
  //   return { articles: rows, count };
  // }

  async getPopularsPublication() {
    return await this.publicationRepository.findAll({
      order: [['views', 'DESC']],
      where: {
        is_news: false,
      },
      offset: 0,
      limit: 10,
      attributes: ['name', 'slug', 'views'],
    });
  }

  // async getPublicationById(id) {
  //   return await this.publicationRepository.findByPk(id, {
  //     include: { all: true },
  //   });
  // }

  async getPublicationBySlug(slug) {
    return await this.publicationRepository.findOne({
      where: {
        slug,
      },
      include: { all: true },
    });
  }

  async getNewsForMainPage() {
    return await this.publicationRepository.findAll({
      order: [['date', 'DESC']],
      where: {
        is_news: true,
      },
      offset: 0,
      limit: 20,
      attributes: ['name', 'slug', 'date'],
      include: [{ model: Author, attributes: ['name'] }],
    });
  }

  async getArticlesForMainPage() {
    const articles = await this.publicationRepository.findAll({
      order: [['date', 'DESC']],
      where: {
        is_news: false,
      },
      offset: 0,
      limit: 5,
      attributes: ['name', 'slug', 'date', 'image', 'description', 'content'],
      include: [{ model: Author, attributes: ['name'] }],
    });

    checkAndFillDescriptionDeleteContent(articles);

    return articles;
  }
}
