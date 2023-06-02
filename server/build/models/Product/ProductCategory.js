var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './Product.js';
let ProductCategory = class ProductCategory {
};
__decorate([
    PrimaryGeneratedColumn('identity'),
    __metadata("design:type", Number)
], ProductCategory.prototype, "id", void 0);
__decorate([
    Column('text'),
    __metadata("design:type", String)
], ProductCategory.prototype, "name", void 0);
__decorate([
    OneToMany(() => Product, (product) => product.category),
    __metadata("design:type", Object)
], ProductCategory.prototype, "products", void 0);
ProductCategory = __decorate([
    Entity()
], ProductCategory);
export { ProductCategory };
//# sourceMappingURL=ProductCategory.js.map