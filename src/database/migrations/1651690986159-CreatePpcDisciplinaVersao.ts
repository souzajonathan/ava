import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePpcDisciplinaVersao1651690986159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
        await queryRunner.createTable(
            new Table({
                name: "ppcDisciplinaVersao",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'modulo',
                        type: 'varchar'
                    },
                    {
                        name: 'semestre',
                        type: 'varchar'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "ppc_id",
                        type: "uuid"
                    },
                    {
                        name: "disciplina_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_ppc",
                        columnNames: ["ppc_id"],
                        referencedTableName: "ppcs",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_disciplina",
                        columnNames: ["disciplina_id"],
                        referencedTableName: "disciplinas",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("ppcDisciplinaVersao");
    }

}
