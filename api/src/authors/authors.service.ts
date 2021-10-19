import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { CreateAuthorsDto } from './dto/create-authors.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

  async createAuthor(dto: CreateAuthorsDto) {
    return await this.authorRepository.create(dto);
  }

  async updateAuthor(id: string, dto: CreateAuthorsDto) {
    const author = await this.authorRepository.findByPk(id);

    if (!author) {
      throw new HttpException('Автор не найден.', HttpStatus.NOT_FOUND);
    }

    author.name = dto.name || author.name;
    author.slug = dto.slug || author.slug;

    await author.save();
    return author;
  }

  async deleteAuthor(id: string) {
    const author = await this.authorRepository.findByPk(id);

    if (!author) {
      throw new HttpException('Автор не найден.', HttpStatus.NOT_FOUND);
    }

    await author.destroy();
    return author;
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
}
