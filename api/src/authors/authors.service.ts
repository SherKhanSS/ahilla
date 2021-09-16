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
    return await this.authorRepository.findAll();
  }
}
