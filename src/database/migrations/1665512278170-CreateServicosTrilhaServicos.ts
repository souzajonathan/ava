import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServicosTrilhaServicos1665512278170
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "servicos_trilha_servicos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "tipo_servico_id",
                        type: "uuid",
                    },
                    {
                        name: "trilha_servicos_id",
                        type: "uuid",
                    },
                    {
                        name: "posicao",
                        type: "int",
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
                        name: "fk_tipo_servico",
                        columnNames: ["tipo_servico_id"],
                        referencedTableName: "tipos_servicos",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_trilha_servico",
                        columnNames: ["trilha_servicos_id"],
                        referencedTableName: "trilha_servicos",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("servicos_trilha_servicos");
    }
}
