import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'uuid', nullable: true })
  parent_id?: string;

  @Column({ type: 'int', default: 0 })
  sort_order!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;
}