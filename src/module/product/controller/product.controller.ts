import { ProductService } from '../service/product.service.js';
import { Request } from 'express';

export class ProductController {
  private productService = new ProductService();

  async getAll(req: Request) {
    return await this.productService.getAll();
  }

  async getById(req: Request) {
    return await this.productService.getById(req.params.id);
  }

  async create(req: Request) {
    return await this.productService.create(req.body);
  }

  async update(req: Request) {
    return await this.productService.update(req.params.id, req.body);
  }

  async delete(req: Request) {
    await this.productService.delete(req.params.id);
    return { message: 'Product deleted' };
  }
}