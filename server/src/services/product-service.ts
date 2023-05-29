import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source.js';
import { Product } from '../models/Product/Product.js';
import { ProductDto } from '../dtos/product.dto.js';
import productCategoryService from './product-category-service.js';
import ApiError from '../exceptions/ApiError.js';

class ProductService {
  productRepository: Repository<Product>;
  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
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
    product.count = productDto.count;
    product.size = productDto.size;

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
}

export default new ProductService();
