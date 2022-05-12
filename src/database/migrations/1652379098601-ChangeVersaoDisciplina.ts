import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ChangeVersaoDisciplina1652379098601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("ppcDisciplinaVersao", new TableColumn({
            name: "disciplina_versao_id",
            type: "uuid",
            isNullable: true
        }));
        await queryRunner.dropColumn("ppcDisciplinaVersao", "disciplina_id");
        await queryRunner.createForeignKey("ppcDisciplinaVersao", new TableForeignKey({
              name: "fk_disciplina_versao_id",
              columnNames: ["disciplina_versao_id"],
              referencedTableName: "disciplinaVersao",
              referencedColumnNames: ["id"]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("ppcDisciplinaVersao", new TableColumn({
            name: "disciplina_id",
            type: "uuid",
            isNullable: true
        }));
        await queryRunner.dropColumn("ppcDisciplinaVersao", "disciplina_versao_id");
    }

}
