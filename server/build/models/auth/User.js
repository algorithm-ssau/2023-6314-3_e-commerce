var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany, } from 'typeorm';
import { Role } from './Role.js';
import { Token } from './Token.js';
import { FavoriteProduct } from '../Product/FavoriteProduct.js';
import { AddedToCartProduct } from '../Product/AddedToCartProduct.js';
import { PurchasedProduct } from '../Product/PurchasedProduct.js';
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn('identity'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({
        type: 'text',
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: 'text',
        default: 'public/images/default-avatar.jpg',
    }),
    __metadata("design:type", String)
], User.prototype, "avatarURL", void 0);
__decorate([
    ManyToMany(() => Role, (role) => role.users),
    JoinTable(),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    OneToOne(() => Token, (token) => token.user, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    JoinColumn(),
    __metadata("design:type", Object)
], User.prototype, "token", void 0);
__decorate([
    OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user),
    JoinColumn(),
    __metadata("design:type", Array)
], User.prototype, "favoriteProducts", void 0);
__decorate([
    OneToMany(() => AddedToCartProduct, (addedToCartProduct) => addedToCartProduct.user),
    JoinColumn(),
    __metadata("design:type", Array)
], User.prototype, "addedToCartProducts", void 0);
__decorate([
    OneToMany(() => PurchasedProduct, (purchasedProduct) => purchasedProduct.user),
    JoinColumn(),
    __metadata("design:type", Array)
], User.prototype, "purchasedProducts", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=User.js.map