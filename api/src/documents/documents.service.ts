import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDocumentsDto } from './dto/create-documents.dto';
import { Document } from './documents.model';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { MeiliSearch } from 'meilisearch';
import { FilesService } from '../files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
    private fileService: FilesService,
    @InjectMeiliSearch() private readonly meiliSearch: MeiliSearch,
  ) {}

  async createDocument(dto: CreateDocumentsDto, file) {
    const { name, path, category } = await this.fileService.createFile(file);
    const fileName = dto.name || name;
    const document = await this.documentRepository.create({
      name: fileName,
      slug: path,
      category,
    });
    const index = this.meiliSearch.index('documents');
    await index.addDocuments([document]);
    return { status: HttpStatus.CREATED, path };
  }

  async updateDocument(id: string, name: string) {
    const document = await this.documentRepository.findByPk(id);

    if (!document) {
      throw new HttpException('Документ не найден.', HttpStatus.NOT_FOUND);
    }

    document.name = name || document.name;

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

    await this.fileService.deleteFile(document.slug);
    await document.destroy();

    const index = this.meiliSearch.index('documents');
    await index.deleteDocument(id);

    return { status: HttpStatus.OK };
  }

  async getAllDocument() {
    return await this.documentRepository.findAll();
  }

  async getDocumentsForAdminList(start, dateStart, dateEnd, category) {
    let where;

    if (dateStart === '0' || dateEnd === '0') {
      where = category === 'all' ? {} : { category };
    } else if (category === 'all') {
      where = {
        updated_at: {
          [Op.gte]: new Date(dateStart),
          [Op.lt]: new Date(dateEnd),
        },
      };
    } else {
      where = {
        updated_at: {
          [Op.gte]: new Date(dateStart),
          [Op.lt]: new Date(dateEnd),
        },
        category,
      };
    }

    const { count, rows } = await this.documentRepository.findAndCountAll({
      order: [['updated_at', 'DESC']],
      offset: +start,
      limit: 24,
      where,
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
