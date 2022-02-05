import { Group } from 'src/group/entities/group.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('groups-students')
export class GroupStudent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, { nullable: false })
  @JoinColumn({ name: 'groupId' })
  group: string;

  @ManyToOne(() => Student, { nullable: false })
  @JoinColumn({ name: 'studentId' })
  student: string;

  @Column({ type: 'boolean', default: false })
  liquidated: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
