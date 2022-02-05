import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';
import { StudentsModule } from 'src/student/student.module';
import { GroupStudent } from './entities/group-student.entity';
import { GroupStudentController } from './group-student.controller';
import { GroupStudentService } from './group-student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupStudent]),
    GroupModule,
    forwardRef(() => StudentsModule),
  ],
  controllers: [GroupStudentController],
  providers: [GroupStudentService],
  exports: [GroupStudentService],
})
export class GroupStudentModule {}
