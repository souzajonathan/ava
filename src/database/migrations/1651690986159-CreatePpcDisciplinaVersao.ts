import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePpcDisciplinaVersao1651690986159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "ppc_disciplina_versao",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'modulo',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'semestre',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: "ppc_id",
                        type: "uuid"
                    },
                    {
                        name: "disciplina_versao_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_ppc",
                        columnNames: ["ppc_id"],
                        referencedTableName: "ppcs",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "fk_disciplina_versao_id",
                        columnNames: ["disciplina_versao_id"],
                        referencedTableName: "disciplina_versao",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("ppc_disciplina_versao");
    }

}
