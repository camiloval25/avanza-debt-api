import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from 'src/common/transformers/decimal.transformer';
import { User } from 'src/user/entities/users.entity';
import { GroupStudent } from 'src/group-student/entities/group-student.entity';

@Entity('pay-histories')
export class PayHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GroupStudent)
  @JoinColumn({ name: 'groupStudentId' })
  groupStudent: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  remaining: number;

  @Column({ type: 'date', nullable: false })
  nextDueDate: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'payRegisteredById' })
  payRegisteredBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
