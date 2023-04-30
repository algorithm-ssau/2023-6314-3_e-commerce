import { productService } from '../services/productService.js';

class ProductController {
  getAll() {
    return productService.getAll();
  }
  getOne() {
    return productService.getOne();
  }
  addToCart() {
    return productService.addToCart();
  }
  update() {
    return productService.update();
  }
  create() {
    return productService.create();
  }
  delete() {
    return productService.delete();
  }
  purchase() {
    return productService.purchase();
  }
  markAsFavorite() {
    return productService.markAsFavorite();
  }
  addToRecent() {
    return productService.addToRecent();
  }
}

export const productController = new ProductController();
