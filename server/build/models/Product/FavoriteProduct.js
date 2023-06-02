var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../auth/User.js';
import { Product } from './Product.js';
let FavoriteProduct = class FavoriteProduct {
};
__decorate([
    PrimaryGeneratedColumn('identity'),
    __metadata("design:type", Number)
], FavoriteProduct.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.favoriteProducts),
    __metadata("design:type", Object)
], FavoriteProduct.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.favoriteProductsUsers),
    JoinColumn(),
    __metadata("design:type", Object)
], FavoriteProduct.prototype, "product", void 0);
FavoriteProduct = __decorate([
    Entity()
], FavoriteProduct);
export { FavoriteProduct };
//# sourceMappingURL=FavoriteProduct.js.map