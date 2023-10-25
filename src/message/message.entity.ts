import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DiagnosisEntity } from '../diagnosis/diagnosis.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @ManyToOne(() => DiagnosisEntity, diagnosis => diagnosis.messages)
  diagnosis: DiagnosisEntity;
}