import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompetenciaPpcVersao1651774035110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "competencia_ppc_versao",
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
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_competencia",
                        columnNames: ["competencia_id"],
                        referencedTableName: "competencias_habilidades",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "fk_ppc_disciplina_versao",
                        columnNames: ["ppc_disciplina_versao_id"],
                        referencedTableName: "ppc_disciplina_versao",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("competencia_ppc_versao");
    }

}