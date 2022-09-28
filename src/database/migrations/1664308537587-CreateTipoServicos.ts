import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTipoServicos1664308537587 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "tipos_servicos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "valor",
                        type: "number",
                    },
                    {
                        name: "unidade_medida",
                        type: "varchar",
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("tipos_servicos");
    }
}
