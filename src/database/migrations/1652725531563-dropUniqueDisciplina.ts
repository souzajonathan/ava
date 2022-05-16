import {MigrationInterface, QueryRunner} from "typeorm";

export class dropUniqueDisciplina1652725531563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint("disciplinas", "UQ_13bb37df118ae7041ea3c33a2e0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
