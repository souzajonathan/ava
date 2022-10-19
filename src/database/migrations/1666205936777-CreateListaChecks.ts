import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateListaChecks1666205936777 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "lista_checks",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "check_id",
                        type: "uuid",
                    },
                    {
                        name: "profissional_servico_id",
                        type: "uuid",
                    },
                    {
                        name: "versao_componente_pedido_id",
                        type: "uuid",
                    },
                    {
                        name: "check",
                        type: "boolean",
                    },
                    {
                        name: "observacao",
                        type: "string",
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
                        name: "fk_check",
                        columnNames: ["check_id"],
                        referencedTableName: "checks_tipo_servico",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_trilha_servico",
                        columnNames: ["profissional_servico_id"],
                        referencedTableName: "profissionais_servicos",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_versao_componente_pedido",
                        columnNames: ["versao_componente_pedido_id"],
                        referencedTableName: "componentes_pedido_versao",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("lista_checks");
    }
}
