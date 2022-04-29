import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePpcs1651173061200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "ppcs",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "anoVoto",
                        type: "int"
                    },
                    {
                        name: "dataInicio",
                        type: "varchar"
                    },
                    {
                        name: "dataFim",
                        type: "varchar"
                    },
                    {
                        name: "horaCredito",
                        type: "int"
                    },
                    {
                        name: "quantSemestres",
                        type: "int"
                    },
                    {
                        name: "curso_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_cursos",
                        columnNames: ["curso_id"],
                        referencedTableName: "cursos",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("ppcs");
    }

}
