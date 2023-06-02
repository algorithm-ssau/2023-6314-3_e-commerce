var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../auth/User.js';
import { Product } from './Product.js';
let AddedToCartProduct = class AddedToCartProduct {
};
__decorate([
    PrimaryGeneratedColumn('identity'),
    __metadata("design:type", Number)
], AddedToCartProduct.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], AddedToCartProduct.prototype, "count", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.addedToCartProducts),
    __metadata("design:type", Object)
], AddedToCartProduct.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.addedToCartProductsUsers),
    JoinColumn(),
    __metadata("design:type", Object)
], AddedToCartProduct.prototype, "product", void 0);
AddedToCartProduct = __decorate([
    Entity()
], AddedToCartProduct);
export { AddedToCartProduct };
//# sourceMappingURL=AddedToCartProduct.js.map