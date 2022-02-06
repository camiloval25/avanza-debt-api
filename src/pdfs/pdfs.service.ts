import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import { paymentReceiptHtml } from './templates';

@Injectable()
export class PdfsService {
  async generatePaymentReceiptPDF(receipt: any) {
    const html = paymentReceiptHtml(receipt);

    return new Promise((res) => {
      pdf
        .create(html, { orientation: 'portrait', format: 'Letter' })
        .toBuffer((error, buffer) => {
          if (error) return error;
          res(buffer);
        });
    });
  }
}
