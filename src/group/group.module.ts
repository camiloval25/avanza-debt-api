import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { CourseModule } from 'src/course/course.module';
import { GroupStudent } from 'src/group-student/entities/group-student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupStudent]), CourseModule],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
