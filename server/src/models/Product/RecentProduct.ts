import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Relation } from 'typeorm';
import { User } from '../auth/User.js';
import { Product } from './Product.js';

@Entity()
export class RecentProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recentProducts)
  user: Relation<User>;

  @ManyToOne(() => Product, (product) => product.recentProductsUsers)
  @JoinColumn()
  product: Relation<Product>;
}
