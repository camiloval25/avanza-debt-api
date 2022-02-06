import { ScheduleTypeEnum } from 'src/common/enums/schedule-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({
    type: 'enum',
    enum: ScheduleTypeEnum,
    nullable: false,
    default: ScheduleTypeEnum.WEEK,
  })
  scheduleType: ScheduleTypeEnum;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
