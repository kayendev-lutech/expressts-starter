import { Category } from '@module/category/entity/category.entity.js';
import { ProductRepository } from '@module/product/repository/product.respository.js';
import { CategoryRepository } from '@module/category/repository/category.respository.js';

import { Product } from '@module/product/entity/product.entity.js';
import {
  AppError,
  ErrorCode,
  InternalServerErrorException,
} from '@errors/app-error.js';

export class ProductService {
  private productRepository = new ProductRepository();
  private categoryRepository = new CategoryRepository();
  // async getAll(): Promise<Product[]> {
  //   return this.productRepository.findAll();
  // }
  async getAllWithPagination(page : number, limit : number) {
  return this.productRepository.findWithPagination(page, limit);
  }
  async getById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getByIdOrFail(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError(ErrorCode.ERR_004, 'Product not found', 404);
    }
    return product;
  }
  // check product must belong to any category
  async create(data: Partial<Product>): Promise<Product> {
    if (!data.category_id) {
      throw new AppError(ErrorCode.ERR_001, 'category_id is required', 400);
    }
    const category = await this.categoryRepository.findById(data.category_id as string);
    if (!category) {
      throw new AppError(ErrorCode.ERR_004, 'Category not found', 404);
    }
    return this.productRepository.createProduct(data);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const updated = await this.productRepository.updateProduct(id, data);
    if (!updated) {
      throw new AppError(ErrorCode.ERR_004, 'Product not found', 404);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.productRepository.deleteProduct(id);
    // if (!deleted) throw new AppError(ErrorCode.ERR_004, 'Product not found', 404);
  }
}