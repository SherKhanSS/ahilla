import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentsDto } from './dto/create-documents.dto';
import { Document } from './documents.model';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { MeiliSearch } from 'meilisearch';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
    @InjectMeiliSearch() private readonly meiliSearch: MeiliSearch,
  ) {}

  async createDocument(dto: CreateDocumentsDto) {
    const document = await this.documentRepository.create(dto);
    const index = this.meiliSearch.index('documents');
    await index.addDocuments([document]);
    return { status: HttpStatus.CREATED };
  }

  async updateDocument(id: string, dto: CreateDocumentsDto) {
    const document = await this.documentRepository.findByPk(id);

    if (!document) {
      throw new HttpException('Документ не найден.', HttpStatus.NOT_FOUND);
    }

    document.name = dto.name || document.name;
    document.slug = dto.slug || document.slug;

    await document.save();

    const index = this.meiliSearch.index('documents');
    await index.updateDocuments([document]);

    return { status: HttpStatus.CREATED };
  }

  async deleteDocument(id: string) {
    const document = await this.documentRepository.findByPk(id);

    if (!document) {
      throw new HttpException('Документ не найден.', HttpStatus.NOT_FOUND);
    }

    await document.destroy();

    const index = this.meiliSearch.index('documents');
    await index.deleteDocument(id);

    return { status: HttpStatus.OK };
  }

  async getAllDocument() {
    return await this.documentRepository.findAll();
  }

  async getDocumentsForAdminList(start) {
    const { count, rows } = await this.documentRepository.findAndCountAll({
      order: [['name', 'ASC']],
      offset: +start,
      limit: 30,
    });

    return { count, tags: rows };
  }

  async getDocumentById(id) {
    return await this.documentRepository.findByPk(+id);
  }

  async getDocumentsByString(str) {
    const index = this.meiliSearch.index('documents');
    const search = await index.search(str, {
      limit: 10,
    });

    if (search.hits.length === 0) {
      return { status: HttpStatus.NOT_FOUND };
    }

    return search.hits;
  }

  async fillMeiliSearchDocuments() {
    const index = this.meiliSearch.index('documents');
    const documents = await this.documentRepository.findAll({
      attributes: ['id', 'name', 'slug'],
    });
    const response = await index.addDocuments(documents);
    console.log('Документы внесены в поиск, id - ', response.updateId);
    return { MeiliSearch: response };
  }
}
