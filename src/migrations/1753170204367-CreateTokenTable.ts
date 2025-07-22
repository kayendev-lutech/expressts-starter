import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokenTable1753170204367 implements MigrationInterface {
    name = 'CreateTokenTable1753170204367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "token" character varying NOT NULL, "type" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, "is_revoked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_ip" character varying, "user_agent" character varying, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
