import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServicos1664309518278 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "servicos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "componente_pedido_versao_id",
                        type: "uuid",
                    },
                    {
                        name: "tipo_servico_id",
                        type: "uuid",
                    },
                    {
                        name: "observacao",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "posicao",
                        type: "number",
                    },
                    {
                        name: "em_andamento",
                        type: "boolean",
                    },
                    {
                        name: "aprovacao",
                        type: "boolean",
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
                        name: "fk_componente_pedido_versao",
                        columnNames: ["componente_pedido_versao_id"],
                        referencedTableName: "componentes_pedido_versao",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_tipo_servico",
                        columnNames: ["tipo_servico_id"],
                        referencedTableName: "tipos_servicos",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("servicos");
    }
}
