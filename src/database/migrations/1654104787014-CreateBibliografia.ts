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
                        name: "disciplina_versao_id",
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
                        type: "varchar"
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
                        name: "fk_versao_disciplina",
                        columnNames: ["disciplina_versao_id"],
                        referencedTableName: "disciplina_versao",
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
