import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFuncoesRodada1664993138271 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "funcoes_rodada",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "peso_voto",
                        type: "numeric",
                    },
                    {
                        name: "considerar_relevantes",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "especificacao_id",
                        type: "uuid",
                    },
                    {
                        name: "funcao_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "instituicao_id",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_especificacao",
                        columnNames: ["especificacao_id"],
                        referencedTableName: "especificacoes_rodadas",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_funcao",
                        columnNames: ["funcao_id"],
                        referencedTableName: "funcoes",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_instituicao",
                        columnNames: ["instituicao_id"],
                        referencedTableName: "instituicoes",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("funcoes_rodadas");
    }
}
