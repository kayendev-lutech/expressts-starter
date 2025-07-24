import { AppDataSource } from '@config/typeorm.config.js';
import { Product } from '@module/product/entity/product.entity.js';

export class ProductRepository {
  private repo = AppDataSource.getRepository(Product);

  async findAll(): Promise<Product[]> {
    return this.repo.find();
  }
  async findWithPagination(page : number, limit: number): Promise<{ data: Product[]; total: number }> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'ASC' },
    });
    return { data, total };
  }
  async findById(id: string): Promise<Product | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
    await this.repo.update({ id }, data);
    return this.findById(id);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}