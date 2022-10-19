import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCheckTipoServico1666199001228 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "checks_tipo_servico",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "tipo_componente_id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "tipo_servico_id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "check_servico",
                        type: "string",
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "ativo",
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
                        name: "fk_tipo_componente_id",
                        columnNames: ["tipo_componente_id"],
                        referencedTableName: "tipos_componentes",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_tipos_servicos",
                        columnNames: ["tipo_servico_id"],
                        referencedTableName: "tipos_servicos",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("checks_tipo_servico");
    }
}
