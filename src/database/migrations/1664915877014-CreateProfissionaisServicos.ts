import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfissionaisServicos1664915877014
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "profissionais_servicos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "servico_id",
                        type: "uuid",
                    },
                    {
                        name: "profissional_id",
                        type: "uuid",
                    },
                    {
                        name: "data_prazo",
                        type: "timestamp with time zone",
                        isNullable: true,
                    },
                    {
                        name: "data_entrega",
                        type: "timestamp with time zone",
                        isNullable: true,
                    },
                    {
                        name: "convite",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "aceite",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "contrato",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "entrega",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "check",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "ajuste",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "aprovacao_servico",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "fechado",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "pagamento",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "valor_orcado",
                        type: "numeric",
                        isNullable: true,
                    },
                    {
                        name: "valor_pago",
                        type: "numeric",
                        isNullable: true,
                    },
                    {
                        name: "observacao",
                        type: "varchar",
                        isNullable: true,
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
                ],
                foreignKeys: [
                    {
                        name: "fk_servico",
                        columnNames: ["servico_id"],
                        referencedTableName: "servicos",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_profissional",
                        columnNames: ["profissional_id"],
                        referencedTableName: "profissionais",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("profissionais_servicos");
    }
}
