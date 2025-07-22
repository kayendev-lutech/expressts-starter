import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1753170222651 implements MigrationInterface {
    name = 'CreateProductTable1753170222651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" character varying NOT NULL,
            "slug" character varying NOT NULL,
            "description" text,
            "price" numeric(12,2) NOT NULL,
            "discount_price" numeric(12,2),
            "currency_code" character varying NOT NULL DEFAULT 'VND',
            "category_id" uuid NOT NULL,
            "image_url" character varying,
            "is_active" boolean NOT NULL DEFAULT true,
            "is_visible" boolean NOT NULL DEFAULT true,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "metadata" json,
            CONSTRAINT "UQ_product_slug" UNIQUE ("slug"),
            CONSTRAINT "PK_product_id" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }
}