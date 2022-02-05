import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupStudentModule } from 'src/group-student/group-student.module';
import { PayHistoryModule } from 'src/pay-history/pay-history.module';
import { Student } from './entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => GroupStudentModule),
    PayHistoryModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentsModule {}
