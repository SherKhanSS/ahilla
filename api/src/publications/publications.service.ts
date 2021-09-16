import { Injectable } from '@nestjs/common';
import { Publication } from './publications.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePublicationsDto } from './dto/create-publications.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication) private publicationRepository: typeof Publication,
  ) {}
  async createPublication(dto: CreatePublicationsDto) {
    return await this.publicationRepository.create(dto);
  }

  async getAllPublication() {
    return await this.publicationRepository.findAll();
  }
}
