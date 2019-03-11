/* tslint:disable:max-line-length */

import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1552308549488 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "entry" ("created_at" date DEFAULT now(), "modified_at" date DEFAULT now(), "id" SERIAL NOT NULL, "comment_count" integer, "title" character varying(255), "description" character varying(2000), CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("created_at" date DEFAULT now(), "modified_at" date DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "display_dates" character varying(255) NOT NULL, "display_theme" character varying(255) NOT NULL, "logo" character varying(255) NOT NULL, "status" character varying(255) NOT NULL, "status_rules" character varying(255) NOT NULL, "status_theme" character varying(255) NOT NULL, "status_entry" character varying(255) NOT NULL, "status_results" character varying(255) NOT NULL, "status_tournament" character varying(255) NOT NULL, "countdown_config" character varying(255) NOT NULL, "divisions" character varying(255) NOT NULL, "entry_count" integer NOT NULL DEFAULT 0, "started_at" date, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "body" character varying(100000) NOT NULL, "social_links" character varying(1000) NOT NULL, CONSTRAINT "UQ_ef1a1915f99bcf7a87049f74494" UNIQUE ("user_id"), CONSTRAINT "REL_ef1a1915f99bcf7a87049f7449" UNIQUE ("user_id"), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" date DEFAULT now(), "modified_at" date DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "title" character varying, "email" character varying NOT NULL, "avatar" character varying, "is_mod" boolean NOT NULL DEFAULT false, "is_admin" boolean NOT NULL DEFAULT false, "disallow_anonymous" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "password_salt" character varying NOT NULL, "notifications_last_read" TIMESTAMP, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("created_at" date DEFAULT now(), "modified_at" date DEFAULT now(), "id" SERIAL NOT NULL, "comment_count" integer, "name" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "body" character varying(100000), "special_post_type" character varying(255), "published_at" date, "like_count" integer NOT NULL DEFAULT 0, "like_details" character varying(500) NOT NULL DEFAULT '[]', "author_user_id" integer NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ffe60745c834908e281ae7bb0e" ON "post" ("published_at") `);
        await queryRunner.query(`CREATE TABLE "setting" ("created_at" date DEFAULT now(), "modified_at" date DEFAULT now(), "key" SERIAL NOT NULL, "value" character varying(10000) NOT NULL, CONSTRAINT "PK_1c4c95d773004250c157a744d6e" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "user_role" ("created_at" date DEFAULT now(), "modified_at" date DEFAULT now(), "id" SERIAL NOT NULL, "user_id" integer NOT NULL, "user_name" character varying(255) NOT NULL, "user_title" character varying(255), "node_id" integer NOT NULL, "node_type" character varying(255) NOT NULL, "permission" character varying(255) NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ae6ed77a061fbb0f10bbff67ecf" FOREIGN KEY ("author_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ae6ed77a061fbb0f10bbff67ecf"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "setting"`);
        await queryRunner.query(`DROP INDEX "IDX_ffe60745c834908e281ae7bb0e"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "entry"`);
    }

}
