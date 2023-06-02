import { AppDataSource } from '../config/data-source.js';
import { ProductCategory } from '../models/Product/ProductCategory.js';
class ProductCategoryService {
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(ProductCategory);
    }
    getCategoryByName(name) {
        return this.categoryRepository.findOneBy({ name });
    }
    createCategory(name) {
        const category = new ProductCategory();
        category.name = name;
        return this.categoryRepository.save(category);
    }
}
export default new ProductCategoryService();
//# sourceMappingURL=product-category-service.js.map