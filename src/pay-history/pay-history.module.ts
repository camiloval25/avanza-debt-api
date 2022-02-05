import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupStudent } from 'src/group-student/entities/group-student.entity';
import { PdfsModule } from 'src/pdfs/pdfs.module';
import { PayHistory } from './entities/pay-history.entity';
import { PayHistoryController } from './pay-history.controller';
import { PayHistoryService } from './pay-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayHistory, GroupStudent]), PdfsModule],
  controllers: [PayHistoryController],
  providers: [PayHistoryService],
  exports: [PayHistoryService],
})
export class PayHistoryModule {}
