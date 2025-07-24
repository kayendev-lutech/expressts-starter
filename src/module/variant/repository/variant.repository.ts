import { AppDataSource } from '@config/typeorm.config.js';
import { Variant } from '@module/variant/entity/variant.entity.js';

export class VariantRepository {
  private repo = AppDataSource.getRepository(Variant);

  async findAll(): Promise<Variant[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Variant | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createVariant(data: Partial<Variant>): Promise<Variant> {
    const variant = this.repo.create(data);
    return this.repo.save(variant);
  }

  async updateVariant(id: string, data: Partial<Variant>): Promise<Variant | null> {
    await this.repo.update({ id }, data);
    return this.findById(id);
  }

  async deleteVariant(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}