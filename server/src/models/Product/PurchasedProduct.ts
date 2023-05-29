import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, JoinColumn, Relation } from 'typeorm';
import { User } from '../auth/User.js';
import { Product } from './Product.js';

@Entity()
export class PurchasedProduct {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  count: number;

  @ManyToOne(() => User, (user) => user.purchasedProducts)
  user: Relation<User>;

  @ManyToOne(() => Product, (product) => product.purchasedProductsUsers)
  @JoinColumn()
  product: Relation<Product>;
}
