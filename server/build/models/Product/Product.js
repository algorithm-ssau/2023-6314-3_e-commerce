var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductCategory } from './ProductCategory.js';
import { FavoriteProduct } from './FavoriteProduct.js';
import { AddedToCartProduct } from './AddedToCartProduct.js';
import { PurchasedProduct } from './PurchasedProduct.js';
let Product = class Product {
};
__decorate([
    PrimaryGeneratedColumn('identity'),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column('decimal'),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Product.prototype, "material", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], Product.prototype, "photoUrl", void 0);
__decorate([
    Column('integer'),
    __metadata("design:type", Number)
], Product.prototype, "fineness", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "addedAt", void 0);
__decorate([
    Column('integer'),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    Column('integer', { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "size", void 0);
__decorate([
    ManyToOne(() => ProductCategory, (category) => category.products),
    __metadata("design:type", Object)
], Product.prototype, "category", void 0);
__decorate([
    OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.product),
    __metadata("design:type", Array)
], Product.prototype, "favoriteProductsUsers", void 0);
__decorate([
    OneToMany(() => AddedToCartProduct, (addedToCartProduct) => addedToCartProduct.product),
    __metadata("design:type", Array)
], Product.prototype, "addedToCartProductsUsers", void 0);
__decorate([
    OneToMany(() => PurchasedProduct, (purchasedProduct) => purchasedProduct.product),
    __metadata("design:type", Array)
], Product.prototype, "purchasedProductsUsers", void 0);
Product = __decorate([
    Entity()
], Product);
export { Product };
//# sourceMappingURL=Product.js.map