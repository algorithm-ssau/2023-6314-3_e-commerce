import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { Role } from './Role.js';
import { Token } from './Token.js';
import { FavoriteProduct } from '../Product/FavoriteProduct.js';
import { AddedToCartProduct } from '../Product/AddedToCartProduct.js';
import { PurchasedProduct } from '../Product/PurchasedProduct.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
    default: 'public/images/default-avatar.jpg',
  })
  avatarURL: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Relation<Role>[];

  @OneToOne(() => Token, (token) => token.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  token: Relation<Token>;

  @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user)
  @JoinColumn()
  favoriteProducts: Relation<FavoriteProduct>[];

  @OneToMany(() => AddedToCartProduct, (addedToCartProduct) => addedToCartProduct.user)
  @JoinColumn()
  addedToCartProducts: Relation<AddedToCartProduct>[];

  @OneToMany(() => PurchasedProduct, (purchasedProduct) => purchasedProduct.user)
  @JoinColumn()
  purchasedProducts: Relation<PurchasedProduct>[];
}
