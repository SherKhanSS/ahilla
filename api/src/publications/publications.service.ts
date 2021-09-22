import { Injectable } from '@nestjs/common';
import { Publication } from './publications.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication) private publicationRepository: typeof Publication,
    private fileService: FilesService,
  ) {}
  async createPublication(dto: CreatePublicationsDto, image) {
    const fileName = await this.fileService.createFile(image);
    return await this.publicationRepository.create({ ...dto, image: fileName });
  }

  async getNewsFromPublication(offset, limit) {
    return await this.publicationRepository.findAll({
      order: [['updated_at', 'DESC']],
      where: {
        is_news: true,
      },
      offset,
      limit,
      include: { all: true },
    });
  }

  async getArticlesFromPublication(offset, limit) {
    return await this.publicationRepository.findAll({
      order: [['updated_at', 'DESC']],
      where: {
        is_news: false,
      },
      offset,
      limit,
      include: { all: true },
    });
  }

  async getPublicationById(id) {
    return await this.publicationRepository.findByPk(id, {
      include: { all: true },
    });
  }
}
