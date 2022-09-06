import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComponentesPedido1661972516071
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "componentes_pedido",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "observacao",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "item_interno",
                        type: "boolean",
                    },
                    {
                        name: "pedido_id",
                        type: "uuid",
                    },
                    {
                        name: "tipo_componente_id",
                        type: "uuid",
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
                        name: "fk_pedido",
                        columnNames: ["pedido_id"],
                        referencedTableName: "pedidos",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_tipo_componente",
                        columnNames: ["tipo_componente_id"],
                        referencedTableName: "tipos_componentes",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_componente_pedido",
                        columnNames: ["parent_item"],
                        referencedTableName: "componentes_pedido",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("componentes_pedido");
    }
}
