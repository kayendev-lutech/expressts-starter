import { CategoryService } from '../service/category.service.js';
import { Request } from 'express';

export class CategoryController {
  private categoryService = new CategoryService();

  async getAll(req: Request) {
    return await this.categoryService.getAll();
  }

  async getById(req: Request) {
    return await this.categoryService.getById(req.params.id);
  }

  async create(req: Request) {
    return await this.categoryService.create(req.body);
  }

  async update(req: Request) {
    return await this.categoryService.update(req.params.id, req.body);
  }

  async delete(req: Request) {
    await this.categoryService.delete(req.params.id);
    return { message: 'Category deleted' };
  }
}