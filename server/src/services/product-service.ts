import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source.js';
import { Product } from '../models/Product/Product.js';
import { ProductDto } from '../dtos/product.dto.js';
import productCategoryService from './product-category-service.js';
import ApiError from '../exceptions/ApiError.js';
import { AddedToCartProduct } from '../models/Product/AddedToCartProduct.js';
import { User } from '../models/auth/User.js';

class ProductService {
  productRepository: Repository<Product>;
  addedToCartProductRepository: Repository<AddedToCartProduct>;
  userRepository: Repository<User>;
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

  async getOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
    if (!product) throw ApiError.NotFound(`Not found product with id ${id} `);

    return product;
  }

  async create(productDto: ProductDto) {
    const product = new Product();
    product.name = productDto.name;
    product.price = productDto.price;
    product.material = productDto.material;
    product.fineness = productDto.fineness;
    product.discount = productDto.discount;
    product.size = productDto.size;
    product.photoUrl = productDto.photoUrl;

    const category = await productCategoryService.getCategoryByName(productDto.category);

    if (!category) throw ApiError.InternalError(`Not found category "${productDto.category}"`);
    product.category = category;

    return this.productRepository.save(product);
  }

  async update(id: number, productDto: Partial<ProductDto>) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw ApiError.NotFound(`Not found product with id ${id} `);

    const { category: categoryName, ...productRest } = productDto;
    const productToUpdate: Product = {
      ...product,
      ...productRest,
    };

    if (categoryName) {
      const category = await productCategoryService.getCategoryByName(categoryName);
      if (category) {
        productToUpdate.category = category; // I hate TypeORM
      }
    }

    await this.productRepository.save(productToUpdate);

    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (!updatedProduct) throw ApiError.InternalError('Updated product not found');

    return updatedProduct;
  }

  async deleteOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw ApiError.NotFound(`Not found product with id ${id} `);

    return this.productRepository.remove(product);
  }

  private async findProductInCart(userId: number, productId: number) {
    const product = await this.productRepository.findOneBy({ id: productId });
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!product) throw ApiError.NotFound(`Not found product with id ${productId} `);
    if (!user) throw ApiError.NotFound(`Not found user with id ${user} `);

    const productInCart = await this.addedToCartProductRepository.findOneBy({ user, product });

    if (!productInCart)
      throw ApiError.NotFound(`Not found product in cart with userId ${userId} and productId ${productId}`);

    return productInCart;
  }

  async addProductToCart(userId: number, productId: number) {
    const product = await this.productRepository.findOneBy({ id: productId });
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!product) throw ApiError.NotFound(`Not found product with id ${productId} `);
    if (!user) throw ApiError.NotFound(`Not found user with id ${userId} `);

    const productToAdd = new AddedToCartProduct();
    productToAdd.product = product;
    productToAdd.user = user;
    productToAdd.count = 1;
    return this.addedToCartProductRepository.save(productToAdd);
  }

  async removeProductFromCart(userId: number, productId: number) {
    const productToRemove = await this.findProductInCart(userId, productId);

    if (!productToRemove)
      throw ApiError.NotFound(`Not found product in cart with userId ${userId} and productId ${productId}`);

    return this.addedToCartProductRepository.remove(productToRemove);
  }

  async updateProductInCartCount(userId: number, productId: number, newCount: number) {
    if (newCount <= 0) throw ApiError.BadRequest('Count must be positive number');

    const productToUpdate = await this.findProductInCart(userId, productId);

    productToUpdate.count = newCount;
    return this.addedToCartProductRepository.save(productToUpdate);
  }

  async getProductsInCart(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw ApiError.NotFound(`Not found user with id ${userId} `);
    const productsInCart = await this.addedToCartProductRepository.find({
      where: {
        user,
      },
      relations: {
        product: true,
      },
    });

    return productsInCart.map((p) => p.product);
  }
}

export default new ProductService();
