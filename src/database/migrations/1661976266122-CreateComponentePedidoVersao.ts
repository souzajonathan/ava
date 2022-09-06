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
                        name: "pedido_id",
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
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("componentes_pedido_versao");
    }
}
