import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Publication } from './publications.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { FilesService } from '../files/files.service';
import { Author } from '../authors/authors.model';
import { PublicationsTags } from './publications-tags.model';
import { Op } from 'sequelize';
import { TagsService } from '../tags/tags.service';

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
    private tagService: TagsService,
  ) {}

  async createPublication(dto: CreatePublicationsDto) {
    const publication = await this.publicationRepository.create(dto);
    const tags = await this.tagService.getTagByIds(dto.tags);
    await publication.$set('tags', tags);
    return { status: HttpStatus.CREATED, id: publication.id };
  }

  async updatePublication(id: string, dto: CreatePublicationsDto) {
    const publication = await this.publicationRepository.findByPk(id);

    if (!publication) {
      throw new HttpException('Публикация не найдена.', HttpStatus.NOT_FOUND);
    }

    publication.name = dto.name || publication.name;
    publication.slug = dto.slug || publication.slug;
    publication.author_id = dto.author_id || publication.author_id;
    publication.image = dto.image || publication.image;
    publication.date = dto.date || publication.date;
    publication.description = dto.description || publication.description;
    publication.content = dto.content || publication.content;
    publication.is_news = dto.is_news;
    publication.is_published = dto.is_published;

    await publication.save();
    const tags = await this.tagService.getTagByIds(dto.tags);
    await publication.$set('tags', tags);
    return { status: HttpStatus.CREATED, id: publication.id };
  }

  async setPublished(id: string) {
    const publication = await this.publicationRepository.findByPk(id);

    if (!publication) {
      throw new HttpException('Публикация не найдена.', HttpStatus.NOT_FOUND);
    }

    const isPublished = publication.is_published;
    publication.is_published = !isPublished;

    await publication.save();
    return { status: HttpStatus.OK };
  }

  async deletePublication(id: string) {
    const publication = await this.publicationRepository.findByPk(id);

    if (!publication) {
      throw new HttpException('Публикация не найдена.', HttpStatus.NOT_FOUND);
    }

    await publication.destroy();
    return { status: HttpStatus.OK };
  }

  async createImage(image) {
    const fileName = await this.fileService.createFile(image);
    return { uploadedImageName: fileName };
  }

  async getNewsFromPublication(offset, limit, increase, sort) {
    const order = +increase === 0 ? 'DESC' : 'ASC';
    const validSort = sort ? sort : 'date';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        is_news: true,
        is_published: true,
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
    const validSort = sort ? sort : 'date';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        is_news: false,
        is_published: true,
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
    const validSort = sort ? sort : 'date';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        author_id: id,
        is_published: true,
      },
      offset,
      limit,
      include: { all: true },
      distinct: true,
    });

    checkAndFillDescriptionDeleteContent(rows);

    return { articles: rows, count };
  }

  async getPublicationsByDate(id, offset, limit, increase, sort) {
    const [y, m] = id.split('-');
    const days = new Date(y, m, 0).getDate();
    const order = +increase === 0 ? 'DESC' : 'ASC';
    const validSort = sort ? sort : 'date';
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [[validSort, order]],
      where: {
        date: {
          [Op.gte]: new Date(`${id}-01`),
          [Op.lt]: new Date(`${id}-${days}`),
        },
        is_published: true,
      },
      offset,
      limit,
      distinct: true,
    });

    checkAndFillDescriptionDeleteContent(rows);

    return { articles: rows, count };
  }

  async getPublicationsByString(str) {
    let articles = await this.publicationRepository.findAll({
      order: [['date', 'DESC']],
      where: {
        name: {
          [Op.substring]: str,
        },
        is_published: true,
      },
      offset: 0,
      limit: 10,
    });

    if (articles.length === 0) {
      articles = await this.publicationRepository.findAll({
        order: [['date', 'DESC']],
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
        order: [['date', 'DESC']],
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

  async getPopularsPublication() {
    return await this.publicationRepository.findAll({
      order: [['views', 'DESC']],
      where: {
        is_published: true,
      },
      offset: 0,
      limit: 10,
      attributes: ['name', 'slug', 'views'],
    });
  }

  async getDateMark() {
    const firstPublication = await this.publicationRepository.findAll({
      order: [['date', 'ASC']],
      where: {
        is_published: true,
      },
      limit: 1,
      attributes: ['date'],
    });

    const lastPublication = await this.publicationRepository.findAll({
      order: [['date', 'DESC']],
      where: {
        is_published: true,
      },
      limit: 1,
      attributes: ['date'],
    });

    const first = firstPublication[0]['date'];
    const last = lastPublication[0]['date'];

    return { first, last };
  }

  async getPublicationById(id) {
    return await this.publicationRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async getPublicationBySlug(slug) {
    const publication = await this.publicationRepository.findOne({
      where: {
        slug,
        is_published: true,
      },
      include: { all: true },
    });

    if (!publication) {
      throw new HttpException('Публикация не найдена.', HttpStatus.NOT_FOUND);
    }

    await publication.increment('views');

    if (publication.description === '') {
      publication.description =
        publication.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 360) +
        '...';
    }

    return publication;
  }

  async getNewsForMainPage() {
    return await this.publicationRepository.findAll({
      order: [['date', 'DESC']],
      where: {
        is_news: true,
        is_published: true,
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
        is_published: true,
      },
      offset: 0,
      limit: 5,
      attributes: ['name', 'slug', 'date', 'image', 'description', 'content'],
      include: [{ model: Author, attributes: ['name'] }],
    });

    checkAndFillDescriptionDeleteContent(articles);

    return articles;
  }

  async getPublicationsForMobileMainPage() {
    const articles = await this.publicationRepository.findAll({
      order: [['date', 'DESC']],
      where: {
        is_published: true,
      },
      offset: 0,
      limit: 8,
      attributes: ['name', 'slug', 'date', 'image', 'description', 'content'],
      include: [{ model: Author, attributes: ['name'] }],
    });

    checkAndFillDescriptionDeleteContent(articles);

    return articles;
  }

  async getPublicationsForAdminList(start) {
    const { count, rows } = await this.publicationRepository.findAndCountAll({
      order: [['date', 'DESC']],
      offset: +start,
      limit: 30,
      attributes: ['id', 'name', 'is_published'],
    });

    return { count, articles: rows };
  }
}
