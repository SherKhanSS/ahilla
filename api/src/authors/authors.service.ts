import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { CreateAuthorsDto } from './dto/create-authors.dto';
import { Op } from 'sequelize';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

  async createAuthor(dto: CreateAuthorsDto) {
    await this.authorRepository.create(dto);
    return { status: HttpStatus.CREATED };
  }

  async updateAuthor(id: string, dto: CreateAuthorsDto) {
    const author = await this.authorRepository.findByPk(id);

    if (!author) {
      throw new HttpException('Автор не найден.', HttpStatus.NOT_FOUND);
    }

    author.name = dto.name || author.name;
    author.slug = dto.slug || author.slug;

    await author.save();
    return { status: HttpStatus.CREATED };
  }

  async deleteAuthor(id: string) {
    const author = await this.authorRepository.findByPk(id);

    if (!author) {
      throw new HttpException('Автор не найден.', HttpStatus.NOT_FOUND);
    }

    await author.destroy();
    return { status: HttpStatus.OK };
  }

  async getAllAuthor() {
    const authors = await this.authorRepository.findAll();
    return authors.map((it) => {
      return {
        id: it.id,
        name: it.name.split(' ').reverse().join(' ').replace(/[()]/g, ''),
        slug: it.slug,
      };
    });
  }

  async getAuthorsForAdminList(start) {
    const { count, rows } = await this.authorRepository.findAndCountAll({
      order: [['name', 'ASC']],
      offset: +start,
      limit: 30,
      attributes: ['id', 'name'],
    });

    return { count, authors: rows };
  }

  async getAuthorById(id) {
    return await this.authorRepository.findByPk(+id);
  }

  async getAuthorsByString(str) {
    let authors = await this.authorRepository.findAll({
      order: [['name', 'ASC']],
      where: {
        name: {
          [Op.substring]: str,
        },
      },
    });

    if (authors.length === 0) {
      authors = await this.authorRepository.findAll({
        order: [['name', 'ASC']],
        where: {
          slug: {
            [Op.substring]: str,
          },
        },
      });
    }

    return authors;
  }
}
