import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentsDto } from './dto/create-documents.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() tagDto: CreateDocumentsDto) {
    return this.documentsService.createDocument(tagDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() tagDto: CreateDocumentsDto, @Param() params) {
    return this.documentsService.updateDocument(params.id, tagDto);
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
  @Get('admins/list/:start')
  getAllForAdmin(@Param() params) {
    return this.documentsService.getDocumentsForAdminList(params.start);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/:str')
  search(@Param() params) {
    return this.documentsService.getDocumentsByString(params.str);
  }
}
