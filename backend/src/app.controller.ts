import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { analyze_document_text } from './ocr';

@Controller('screenshot')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  async getHello(@Param('name') name: string): Promise<string> {
    const res = await analyze_document_text(name);
    return res;
  }
}
