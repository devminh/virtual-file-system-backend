import {MigrationInterface, QueryRunner} from "typeorm";

export class newFileStorageEntity1649135355882 implements MigrationInterface {
    name = 'newFileStorageEntity1649135355882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_storage" ("id" SERIAL NOT NULL, "parent_id" integer, "name" character varying, "type" character varying, "data" character varying, "is_root" boolean, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2834b5398654dd125afabfd0dc2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file_storage"`);
    }

}
