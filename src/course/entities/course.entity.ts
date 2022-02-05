import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { CourseType } from '../enums/course.enum';
import { ColumnNumericTransformer } from 'src/common/transformers/decimal.transformer';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', nullable: false, length: 100 })
  name: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ type: 'int', nullable: false })
  duration: number;

  @Column({
    type: 'enum',
    enum: CourseType,
    nullable: false,
    default: CourseType.COURSE,
  })
  courseType: CourseType;

  @OneToMany(() => Group, (group) => group.course)
  groups: Group;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
