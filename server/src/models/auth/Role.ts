import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Relation } from 'typeorm';
import { User } from './User.js';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  value: string;

  @Column('text')
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: Relation<User>[];
}
