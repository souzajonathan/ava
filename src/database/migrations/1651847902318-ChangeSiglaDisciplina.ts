import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeSiglaDisciplina1651847902318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("disciplinas", new TableColumn({
            name: "sigla",
            type: "varchar",
            isNullable: true
        }));
        await queryRunner.dropColumn("disciplinaVersao", "sigla");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("disciplinaVersao", new TableColumn({
            name: "sigla",
            type: "varchar",
            isNullable: true
        }));
        await queryRunner.dropColumn("disciplinas", "sigla");
    }

}
