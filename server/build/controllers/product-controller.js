var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productService from '../services/product-service.js';
import { ProductDto } from '../dtos/product.dto.js';
class ProductController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getAll();
                res.json(products);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield productService.getOne(+req.body.productId);
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, material, fineness, discount, count, category, size, photoUrl } = req.body;
                const product = yield productService.create(new ProductDto(name, price, material, fineness, discount, count, category, photoUrl, size));
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, material, fineness, discount, count, category, size, photoUrl } = req.body;
                const product = yield productService.update(+req.body.productId, new ProductDto(name, price, material, fineness, discount, count, category, photoUrl, size));
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productService.deleteOne(+req.body.productId);
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllInCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getProductsInCart(+req.params.id);
                res.json(products);
            }
            catch (err) {
                next(err);
            }
        });
    }
    addToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                const product = yield productService.addProductToCart(+req.params.id, productId);
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    removeFromCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                const product = yield productService.removeProductFromCart(+req.params.id, productId);
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
    changeProductCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, count } = req.body;
                const product = yield productService.updateProductInCartCount(+req.params.id, productId, count);
                res.json(product);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
export default new ProductController();
//# sourceMappingURL=product-controller.js.map