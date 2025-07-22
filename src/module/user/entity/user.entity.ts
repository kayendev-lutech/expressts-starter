import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at?: Date;

  @Column({ type: 'varchar' })
  password_hash!: string;

  @Column({ type: 'varchar', nullable: true })
  full_name?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true })
  avatar_url?: string;

  @Column({ type: 'varchar', default: 'customer' })
  role!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;
}