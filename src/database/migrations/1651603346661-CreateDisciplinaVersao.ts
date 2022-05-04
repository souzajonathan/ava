import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDisciplinaVersao1651603346661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "disciplinaVersao",
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
                        name: "sigla",
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
                        name: "bibliografia_basica",
                        type: "varchar"
                    },
                    {
                        name: "comp_bibliografia",
                        type: "varchar"
                    },
                    {
                        name: "observacao",
                        type: "varchar"
                    },
                    {
                        name: "em_oferta",
                        type: "int"
                    },
                    {
                        name: "produzido",
                        type: "int"
                    },
                    {
                        name: "disciplina_id",
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
        await queryRunner.dropTable("disciplinaVersao");
    }

}
