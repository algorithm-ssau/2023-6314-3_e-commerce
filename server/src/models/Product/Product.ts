import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany, Relation } from 'typeorm';
import { ProductCategory } from './ProductCategory.js';
import { FavoriteProduct } from './FavoriteProduct.js';
import { AddedToCartProduct } from './AddedToCartProduct.js';
import { PurchasedProduct } from './PurchasedProduct.js';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('text')
  name: string;

  @Column('decimal')
  price: number;

  @Column('text')
  material: string;

  @Column('integer')
  fineness: number;

  @CreateDateColumn()
  addedAt: Date;

  @Column('integer')
  discount: number;

  @Column('integer', { nullable: true })
  size?: number;

  @Column('integer')
  count: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: Relation<ProductCategory>;

  @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.product)
  favoriteProductsUsers: Relation<FavoriteProduct>[];

  @OneToMany(() => AddedToCartProduct, (addedToCartProduct) => addedToCartProduct.product)
  addedToCartProductsUsers: Relation<AddedToCartProduct>[];

  @OneToMany(() => PurchasedProduct, (purchasedProduct) => purchasedProduct.product)
  purchasedProductsUsers: Relation<PurchasedProduct>[];
}
