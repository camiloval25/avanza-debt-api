import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Course, (course) => course.groups, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'courseId' })
  course: string;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'scheduleId' })
  schedule: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
