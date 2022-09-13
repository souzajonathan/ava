import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComponentePedidoVersao1661976266122
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "componentes_pedido_versao",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "componente_pedido_id",
                        type: "uuid",
                    },
                    {
                        name: "concluido",
                        type: "boolean",
                    },
                    {
                        name: "cancelado",
                        type: "boolean",
                    },
                    {
                        name: "parent_item",
                        type: "uuid",
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
                        name: "fk_componente_pedido",
                        columnNames: ["componente_pedido_id"],
                        referencedTableName: "componentes_pedido",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_componente_pedido_versao",
                        columnNames: ["parent_item"],
                        referencedTableName: "componentes_pedido_versao",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("componentes_pedido_versao");
    }
}
