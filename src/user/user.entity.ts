import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 8, nullable: false })
  password: string;
}