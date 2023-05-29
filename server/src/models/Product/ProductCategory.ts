import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import { Product } from './Product.js';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('text')
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product>;
}
