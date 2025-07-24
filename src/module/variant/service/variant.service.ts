import { VariantRepository } from '@module/variant/repository/variant.repository.js';
import { Variant } from '@module/variant/entity/variant.entity.js';

export class VariantService {
  private variantRepository = new VariantRepository();

  async getAll(): Promise<Variant[]> {
    return this.variantRepository.findAll();
  }

  async getById(id: string): Promise<Variant | null> {
    return this.variantRepository.findById(id);
  }

  async create(data: Partial<Variant>): Promise<Variant> {
    return this.variantRepository.createVariant(data);
  }

  async update(id: string, data: Partial<Variant>): Promise<Variant | null> {
    return this.variantRepository.updateVariant(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.variantRepository.deleteVariant(id);
  }
}