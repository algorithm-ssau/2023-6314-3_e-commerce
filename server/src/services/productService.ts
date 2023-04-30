class ProductService {
  getAll() {
    return 'getAll';
  }
  getOne() {
    return 'getOne';
  }
  addToCart() {
    return 'addToCart';
  }
  create() {
    return 'create';
  }
  update() {
    return 'update';
  }
  delete() {
    return 'delete';
  }
  markAsFavorite() {
    return 'markAsFavorite';
  }
  addToRecent() {
    return 'addToRecent';
  }
  purchase() {
    return 'purchase';
  }
}

export const productService = new ProductService();
