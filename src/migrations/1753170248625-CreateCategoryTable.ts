import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1753170248625 implements MigrationInterface {
    name = 'CreateCategoryTable1753170248625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "parent_id" uuid, "sort_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "metadata" json, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
