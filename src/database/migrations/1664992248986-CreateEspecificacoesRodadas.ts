import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEspecificacoesRodadas1664992248986
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "especificacoes_rodadas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "nome_rodada",
                        type: "varchar",
                    },
                    {
                        name: "porcentagem_aprovacao",
                        type: "numeric",
                    },
                    {
                        name: "numero_rodada",
                        type: "int",
                    },
                    {
                        name: "entidade_id",
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
                        name: "fk_entidade",
                        columnNames: ["entidade_id"],
                        referencedTableName: "entidades",
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
        await queryRunner.dropTable("especificacoes_rodadas");
    }
}
