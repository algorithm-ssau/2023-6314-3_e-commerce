import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Relation } from 'typeorm';
import { User } from './User.js';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  value: string;

  @OneToOne(() => User, (user) => user.token)
  user: Relation<User>;
}
