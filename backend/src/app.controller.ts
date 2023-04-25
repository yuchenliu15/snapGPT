import { Controller, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileUploadService } from './app.service';
import { analyze_document_text } from './ocr';
import { Post, UseInterceptors, UploadedFile } from '@nestjs/common';

@Controller('screenshot')
export class AppController {
  constructor(private readonly service: FileUploadService) {}

  @Get()
  async getMeme(@Param('name') name: string): Promise<string> {
    return 'meme';
  }

  @Get(':name')
  async getHello(@Param('name') name: string): Promise<string> {
    const res = await analyze_document_text(name);
    return res;
  }

  @Post(':name')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Param('name') name: string) {
    console.log(file);
    console.log(name);
    return await this.service.upload(file, name);
  }
}
