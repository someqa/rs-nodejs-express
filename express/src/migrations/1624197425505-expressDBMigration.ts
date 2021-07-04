import {MigrationInterface, QueryRunner} from "typeorm";
import { hash } from 'bcrypt';

export class expressDBMigration1624197425505 implements MigrationInterface {
    name = 'expressDBMigration1624197425505'
   
    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminPassword=await hash('admin', 12);
        await queryRunner.query(`CREATE TABLE "column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_cee3c7ee3135537fb8f5df4422b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "order" integer NOT NULL, "description" text NOT NULL, "userId" uuid, "boardId" uuid NOT NULL, "columnId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "login" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "user" (id, name, login, password) VALUES ('00000000-0000-0000-0000-000000000001', 'Admin Name', 'admin', '${adminPassword}')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "column"`);
    }

}
