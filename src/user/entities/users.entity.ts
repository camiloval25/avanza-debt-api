import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../enums/users.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  lastName: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashUserPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
