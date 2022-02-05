import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import { paymentReceiptHtml } from './templates';

@Injectable()
export class PdfsService {
  async generatePaymentReceiptPDF(receipt: any) {
    const options = {
      height: '140mm',
      width: '216mm',
    };

    const html = paymentReceiptHtml(receipt);

    return new Promise((res) => {
      pdf.create(html, options).toBuffer((_, buffer) => {
        res(buffer);
      });
    });
  }
}
