import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductIdQueryDto {
  @Type(() => Number)
  @IsInt({ message: 'product_id must be an integer' })
  @Min(1, { message: 'product_id must be greater than 0' })
  product_id!: number;
}
