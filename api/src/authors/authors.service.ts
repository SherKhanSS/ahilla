import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { CreateAuthorsDto } from './dto/create-authors.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

  async createAuthor(dto: CreateAuthorsDto) {
    return await this.authorRepository.create(dto);
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
