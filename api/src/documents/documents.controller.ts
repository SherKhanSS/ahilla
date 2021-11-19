import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentsDto } from './dto/create-documents.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() dto: CreateDocumentsDto, @UploadedFile() file) {
    return this.documentsService.createDocument(dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/:name')
  update(@Param() params) {
    return this.documentsService.updateDocument(params.id, params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params) {
    return this.documentsService.deleteDocument(params.id);
  }

  @Get()
  getAll() {
    return this.documentsService.getAllDocument();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param() params) {
    return this.documentsService.getDocumentById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admins/list/:start/:date_start/:date_end/:category')
  getAllForAdmin(@Param() params) {
    return this.documentsService.getDocumentsForAdminList(
      params.start,
      params.date_start,
      params.date_end,
      params.category,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:str')
  search(@Param() params) {
    return this.documentsService.getDocumentsByString(params.str);
  }
}
