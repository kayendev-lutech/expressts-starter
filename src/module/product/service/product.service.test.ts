import { ProductService } from '@module/product/service/product.service.js';
import { ProductRepository } from '@module/product/repository/product.respository.js';

jest.mock('@module/product/repository/product.respository.js');

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = new ProductRepository() as jest.Mocked<ProductRepository>;
    productService = new ProductService();
    // @ts-ignore
    productService['productRepository'] = productRepository;
  });

  it('should throw error if category_id is missing when creating product', async () => {
    await expect(productService.create({ name: 'Test' }))
      .rejects
      .toThrow('category_id is required');
  });
});