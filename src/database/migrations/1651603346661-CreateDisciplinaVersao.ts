import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDisciplinaVersao1651603346661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "disciplina_versao",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "disciplina_versao_nome",
                        type: "varchar"
                    },
                    {
                        name: "codigo",
                        type: "varchar"
                    },
                    {
                        name: "credito_quantidade",
                        type: "int"
                    },
                    {
                        name: "ementa",
                        type: "varchar"
                    },
                    {
                        name: "observacao",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "em_oferta",
                        type: "boolean"
                    },
                    {
                        name: "produzido",
                        type: "boolean"
                    },
                    {
                        name: "disciplina_id",
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
                        name: "fk_disciplina",
                        columnNames: ["disciplina_id"],
                        referencedTableName: "disciplinas",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("disciplina_versao");
    }

}
