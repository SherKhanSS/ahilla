import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePagesDto } from './dto/create-pages.dto';
import { Page } from './pages.model';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page) private pageRepository: typeof Page) {}

  async updatePage(slug: string, dto: CreatePagesDto) {
    const page = await this.pageRepository.findOne({
      where: {
        slug,
      },
    });

    if (!page) {
      await this.pageRepository.create(dto);
      return { status: HttpStatus.CREATED };
    }

    page.content = dto.content || page.content;
    await page.save();

    return { status: HttpStatus.CREATED };
  }

  async getPageBySlug(slug) {
    const page = await this.pageRepository.findOne({
      where: {
        slug,
      },
    });

    if (!page) {
      throw new HttpException('Страница не найдена.', HttpStatus.NOT_FOUND);
    }

    return page;
  }
}
