import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './authors.model';
import { CreateAuthorsDto } from './dto/create-authors.dto';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author) private authorRepository: typeof Author,
    @InjectMeiliSearch() private readonly meiliSearch: MeiliSearch,
  ) {}

  async createAuthor(dto: CreateAuthorsDto) {
    const author = await this.authorRepository.create(dto);
    const index = this.meiliSearch.index('authors');
    await index.addDocuments([author]);
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

    const index = this.meiliSearch.index('authors');
    await index.updateDocuments([author]);

    return { status: HttpStatus.CREATED };
  }

  async deleteAuthor(id: string) {
    const author = await this.authorRepository.findByPk(id);

    if (!author) {
      throw new HttpException('Автор не найден.', HttpStatus.NOT_FOUND);
    }

    await author.destroy();

    const index = this.meiliSearch.index('authors');
    await index.deleteDocument(id);

    return { status: HttpStatus.OK };
  }

  async getAllAuthor() {
    const authors = await this.authorRepository.findAll();
    return authors.map((it) => {
      return {
        id: it.id,
        name: it.name.split(' ').reverse().join(' '),
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
    const index = this.meiliSearch.index('authors');
    const search = await index.search(str, {
      limit: 10,
    });

    if (search.hits.length === 0) {
      return { status: HttpStatus.NOT_FOUND };
    }

    return search.hits;
  }

  async fillMeiliSearchAuthors() {
    const index = this.meiliSearch.index('authors');
    const authors = await this.authorRepository.findAll({
      attributes: ['id', 'name', 'slug'],
    });
    const response = await index.addDocuments(authors);
    console.log('Авторы внесены в поиск, id - ', response.updateId);
    return { MeiliSearch: response };
  }
}
