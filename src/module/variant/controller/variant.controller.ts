import { VariantService } from '../service/variant.service.js';
import { Request } from 'express';

export class VariantController {
  private variantService = new VariantService();

  async getAll(req: Request) {
    return await this.variantService.getAll();
  }

  async getById(req: Request) {
    return await this.variantService.getById(req.params.id);
  }

  async create(req: Request) {
    return await this.variantService.create(req.body);
  }

  async update(req: Request) {
    return await this.variantService.update(req.params.id, req.body);
  }

  async delete(req: Request) {
    await this.variantService.delete(req.params.id);
    return { message: 'Variant deleted' };
  }
}