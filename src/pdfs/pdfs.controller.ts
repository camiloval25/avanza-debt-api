import { Controller } from '@nestjs/common';
import { PdfsService } from './pdfs.service';

@Controller('pdfs')
export class PdfsController {
  constructor(private readonly pdfService: PdfsService) {}
}
