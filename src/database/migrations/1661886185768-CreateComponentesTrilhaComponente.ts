import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComponentesTrilhaComponente1661886185768
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "componentes_trilha_componentes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "trilha_componentes_id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: true,
                    },
                    {
                        name: "tipos_componentes_id",
                        type: "uuid",
                        isPrimary: true,
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
                        name: "fk_tipos_componentes_id",
                        columnNames: ["tipos_componentes_id"],
                        referencedTableName: "tipos_componentes",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_trilha_componentes_id",
                        columnNames: ["trilha_componentes_id"],
                        referencedTableName: "trilha_componentes",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("componentes_trilha_componente");
    }
}
