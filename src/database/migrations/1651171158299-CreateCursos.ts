import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCursos1651171158299 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "cursos",
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
                        name: "ppc_ativo",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "active",
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
                    {
                        name: "instituicao_id",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_instituicao",
                        columnNames: ["instituicao_id"],
                        referencedTableName: "instituicoes",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("cursos");
    }
}
