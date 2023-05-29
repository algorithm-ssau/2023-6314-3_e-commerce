import { Repository } from 'typeorm';

import { AppDataSource } from '../config/data-source.js';
import { ProductCategory } from '../models/Product/ProductCategory.js';

class ProductCategoryService {
  categoryRepository: Repository<ProductCategory>;
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(ProductCategory);
  }

  getCategoryByName(name: string) {
    return this.categoryRepository.findOneBy({ name });
  }

  createCategory(name: string) {
    const category = new ProductCategory();
    category.name = name;
    return this.categoryRepository.save(category);
  }
}

export default new ProductCategoryService();
