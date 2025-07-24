import { ProductService } from '@module/product/service/product.service.js';
import { WrappedRequest } from '@utils/wrapper.util.js';
import {
  AppError,
  ErrorCode,
  InternalServerErrorException,
} from '@errors/app-error.js';

export class ProductController {
  private productService = new ProductService();

  async getAll({ query }: WrappedRequest) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const { data, total } = await this.productService.getAllWithPagination(page, limit);
      return {
        status: 200,
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get products', error);
    }
  }

  async getById({ params }: WrappedRequest) {
    try {
      const product = await this.productService.getByIdOrFail(params.id);
      return {
        status: 200,
        data: product,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to get product by id', error);
    }
  }

  async create({ body }: WrappedRequest) {
    try {
      const created = await this.productService.create(body);
      return {
        status: 201,
        data: created,
        message: 'Product created',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to create product', error);
    }
  }

  async update({ params, body }: WrappedRequest) {
    try {
      const updated = await this.productService.update(params.id, body);
      return {
        status: 200,
        data: updated,
        message: 'Product updated',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to update product', error);
    }
  }

  async delete({ params }: WrappedRequest) {
    try {
      await this.productService.delete(params.id);
      return {
        status: 200,
        message: 'Product deleted',
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new InternalServerErrorException(error?.message || 'Failed to delete product', error);
    }
  }
}