import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Header,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserDTO } from 'src/user/dtos/user.dto';
import { CreatePayDTO } from './dtos/pay-history.dto';
import { PayHistoryService } from './pay-history.service';

@ApiTags('Pay History')
@Auth()
@Controller('pay-histories')
export class PayHistoryController {
  constructor(private readonly payHistoryService: PayHistoryService) {}

  @Get('/close-to-pay')
  async getNextStudentsToPay(@Query() query) {
    return await this.payHistoryService.getNextStudentsToPay(query);
  }

  @Get('/student-receipt/:paymentHistoryId')
  async getStudentReceipt(
    @Param('paymentHistoryId') paymentHistoryId: string,
    @Res() res: Response,
  ) {
    const pdfReceipt = await this.payHistoryService.getStudentPaymentReceipt(
      paymentHistoryId,
    );

    res.end(pdfReceipt);
  }

  @Get('/student-history/:id')
  async getStudentPaymentHistory(@Param('id') studentId: string) {
    return await this.payHistoryService.getStudentPaymentHistory(studentId);
  }

  @Post()
  async registerPay(
    @Body() payInformation: CreatePayDTO,
    @User() user: UserDTO,
  ) {
    return await this.payHistoryService.registerPay(payInformation, user);
  }
}
