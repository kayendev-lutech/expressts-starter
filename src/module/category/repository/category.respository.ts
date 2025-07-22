import { AppDataSource } from '@config/typeorm.config';
import { Category } from '../entity/category.entity';

export class CategoryRepository {
  private repo = AppDataSource.getRepository(Category);

  async findAll(): Promise<Category[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Category | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    const category = this.repo.create(data);
    return this.repo.save(category);
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
    await this.repo.update({ id }, data);
    return this.findById(id);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}