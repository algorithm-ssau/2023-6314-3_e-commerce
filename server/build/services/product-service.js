var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { AppDataSource } from '../config/data-source.js';
import { Product } from '../models/Product/Product.js';
import productCategoryService from './product-category-service.js';
import ApiError from '../exceptions/ApiError.js';
import { AddedToCartProduct } from '../models/Product/AddedToCartProduct.js';
import { User } from '../models/auth/User.js';
class ProductService {
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
        this.addedToCartProductRepository = AppDataSource.getRepository(AddedToCartProduct);
        this.userRepository = AppDataSource.getRepository(User);
    }
    getAll() {
        return this.productRepository.find({
            relations: {
                category: true,
            },
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne({
                where: { id },
                relations: {
                    category: true,
                },
            });
            if (!product)
                throw ApiError.NotFound(`Not found product with id ${id} `);
            return product;
        });
    }
    create(productDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new Product();
            product.name = productDto.name;
            product.price = productDto.price;
            product.material = productDto.material;
            product.fineness = productDto.fineness;
            product.discount = productDto.discount;
            product.size = productDto.size;
            product.photoUrl = productDto.photoUrl;
            const category = yield productCategoryService.getCategoryByName(productDto.category);
            if (!category)
                throw ApiError.InternalError(`Not found category "${productDto.category}"`);
            product.category = category;
            return this.productRepository.save(product);
        });
    }
    update(id, productDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOneBy({ id });
            if (!product)
                throw ApiError.NotFound(`Not found product with id ${id} `);
            const { category: categoryName } = productDto, productRest = __rest(productDto, ["category"]);
            const productToUpdate = Object.assign(Object.assign({}, product), productRest);
            if (categoryName) {
                const category = yield productCategoryService.getCategoryByName(categoryName);
                if (category) {
                    productToUpdate.category = category;
                }
            }
            yield this.productRepository.save(productToUpdate);
            const updatedProduct = yield this.productRepository.findOneBy({ id });
            if (!updatedProduct)
                throw ApiError.InternalError('Updated product not found');
            return updatedProduct;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOneBy({ id });
            if (!product)
                throw ApiError.NotFound(`Not found product with id ${id} `);
            return this.productRepository.remove(product);
        });
    }
    findProductInCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOneBy({ id: productId });
            const user = yield this.userRepository.findOneBy({ id: userId });
            if (!product)
                throw ApiError.NotFound(`Not found product with id ${productId} `);
            if (!user)
                throw ApiError.NotFound(`Not found user with id ${user} `);
            const productInCart = yield this.addedToCartProductRepository.findOneBy({ user, product });
            if (!productInCart)
                throw ApiError.NotFound(`Not found product in cart with userId ${userId} and productId ${productId}`);
            return productInCart;
        });
    }
    addProductToCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOneBy({ id: productId });
            const user = yield this.userRepository.findOneBy({ id: userId });
            if (!product)
                throw ApiError.NotFound(`Not found product with id ${productId} `);
            if (!user)
                throw ApiError.NotFound(`Not found user with id ${userId} `);
            const productToAdd = new AddedToCartProduct();
            productToAdd.product = product;
            productToAdd.user = user;
            productToAdd.count = 1;
            return this.addedToCartProductRepository.save(productToAdd);
        });
    }
    removeProductFromCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productToRemove = yield this.findProductInCart(userId, productId);
            if (!productToRemove)
                throw ApiError.NotFound(`Not found product in cart with userId ${userId} and productId ${productId}`);
            return this.addedToCartProductRepository.remove(productToRemove);
        });
    }
    updateProductInCartCount(userId, productId, newCount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newCount <= 0)
                throw ApiError.BadRequest('Count must be positive number');
            const productToUpdate = yield this.findProductInCart(userId, productId);
            productToUpdate.count = newCount;
            return this.addedToCartProductRepository.save(productToUpdate);
        });
    }
    getProductsInCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id: userId });
            if (!user)
                throw ApiError.NotFound(`Not found user with id ${userId} `);
            const productsInCart = yield this.addedToCartProductRepository.find({
                where: {
                    user,
                },
                relations: {
                    product: true,
                },
            });
            return productsInCart.map((p) => p.product);
        });
    }
}
export default new ProductService();
//# sourceMappingURL=product-service.js.map