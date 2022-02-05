import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentType } from 'src/common/enums/document-type.enum';
import { PayHistory } from 'src/pay-history/entities/pay-history.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  lastName: string;

  @Column({ type: 'enum', enum: DocumentType, nullable: false })
  documentType: DocumentType;

  @Column({ type: 'varchar', nullable: false, length: 15, unique: true })
  identification: string;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  contactPhone: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
