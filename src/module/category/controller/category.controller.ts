import { CategoryService } from '@module/category/service/category.service.js';
import { WrappedRequest } from '@utils/wrapper.util.js';
import {
  AppError,
  ErrorCode,
  InternalServerErrorException,
} from '@errors/app-error.js';

export class CategoryController {
  private categoryService = new CategoryService();

  async getAll(_req: WrappedRequest) {
    try {
      const result = await this.categoryService.getAll();
      return {
        status: 200,
        data: result,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get categories', error);
    }
  }

    async getById({ params }: WrappedRequest) {
    try {
      const category = await this.categoryService.getByIdOrFail(params.id);
      return {
        status: 200,
        data: category,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get category by id', error);
    }
  }

  async update({ params, body }: WrappedRequest) {
    try {
      const updated = await this.categoryService.update(params.id, body);
      return {
        status: 200,
        data: updated,
        message: 'Category updated',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to update category', error);
    }
  }

  async delete({ params }: WrappedRequest) {
    try {
      await this.categoryService.delete(params.id);
      return {
        status: 200,
        message: 'Category deleted',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to delete category', error);
    }
  }

  async create({ body }: WrappedRequest) {
    try {
      const created = await this.categoryService.create(body);
      return {
        status: 201,
        data: created,
        message: 'Category created',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to create category', error);
    }
  }

}