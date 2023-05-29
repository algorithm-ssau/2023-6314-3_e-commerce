import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Relation } from 'typeorm';
import { User } from '../auth/User.js';
import { Product } from './Product.js';

@Entity()
export class FavoriteProduct {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteProducts)
  user: Relation<User>;

  @ManyToOne(() => Product, (product) => product.favoriteProductsUsers)
  @JoinColumn()
  product: Relation<Product>;
}
