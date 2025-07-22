import { CategoryRepository } from '../repository/category.respository.js';
import { Category } from '../entity/category.entity.js';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async getById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async create(data: Partial<Category>): Promise<Category> {
    return this.categoryRepository.createCategory(data);
  }

  async update(id: string, data: Partial<Category>): Promise<Category | null> {
    return this.categoryRepository.updateCategory(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.deleteCategory(id);
  }
}