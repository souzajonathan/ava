import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBibliografia1654104787014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "bibliografias",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "versao_disciplina_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "obra_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "tipo",
                        type: "boolean",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_versao_disciplina",
                        columnNames: ["versao_disciplina_id"],
                        referencedTableName: "disciplinaVersao",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_obra",
                        columnNames: ["obra_id"],
                        referencedTableName: "obras",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bibliografias");
    }

}
