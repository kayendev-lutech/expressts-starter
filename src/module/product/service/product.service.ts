import { ProductRepository } from '../repository/product.respository.js';
import { Product } from '../entity/product.entity.js';

export class ProductService {
  private productRepository = new ProductRepository();

  async getAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async create(data: Partial<Product>): Promise<Product> {
    return this.productRepository.createProduct(data);
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.productRepository.updateProduct(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}