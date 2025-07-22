import { AppDataSource } from '@config/typeorm.config';
import { Product } from '@module/product/entity/product.entity';

export class ProductRepository {
  private repo = AppDataSource.getRepository(Product);

  async findAll(): Promise<Product[]> {
    return this.repo.find();
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