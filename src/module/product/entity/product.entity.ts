import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  discount_price?: number;

  @Column({ type: 'varchar', default: 'VND' })
  currency_code!: string;

  @Column({ type: 'uuid' })
  category_id!: string;

  @Column({ type: 'varchar', nullable: true })
  image_url?: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'boolean', default: true })
  is_visible!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;
}