import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTomate1651774035110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "tomate",
                columns: [
                    {
                        name: "competencia_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "ppc_disciplina_versao_id",
                        type: "uuid",
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_competencia",
                        columnNames: ["competencia_id"],
                        referencedTableName: "competHabilidades",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_ppc_disciplina_versao",
                        columnNames: ["ppc_disciplina_versao_id"],
                        referencedTableName: "ppcDisciplinaVersao",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("tomate");
    }

}