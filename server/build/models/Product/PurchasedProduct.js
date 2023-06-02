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
let PurchasedProduct = class PurchasedProduct {
};
__decorate([
    PrimaryGeneratedColumn('identity'),
    __metadata("design:type", Number)
], PurchasedProduct.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], PurchasedProduct.prototype, "count", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.purchasedProducts),
    __metadata("design:type", Object)
], PurchasedProduct.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.purchasedProductsUsers),
    JoinColumn(),
    __metadata("design:type", Object)
], PurchasedProduct.prototype, "product", void 0);
PurchasedProduct = __decorate([
    Entity()
], PurchasedProduct);
export { PurchasedProduct };
//# sourceMappingURL=PurchasedProduct.js.map