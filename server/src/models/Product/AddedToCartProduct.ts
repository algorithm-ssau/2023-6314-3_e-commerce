import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, JoinColumn, Relation } from 'typeorm';
import { User } from '../auth/User.js';
import { Product } from './Product.js';

@Entity()
export class AddedToCartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @ManyToOne(() => User, (user) => user.addedToCartProducts)
  user: Relation<User>;

  @ManyToOne(() => Product, (product) => product.addedToCartProductsUsers)
  @JoinColumn()
  product: Relation<Product>;
}
