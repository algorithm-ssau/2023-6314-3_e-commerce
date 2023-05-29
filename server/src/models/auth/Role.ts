import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Relation } from 'typeorm';
import { User } from './User.js';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text', unique: true })
  value: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: Relation<User>[];
}
