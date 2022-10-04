import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAgentes1664912043369 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "agentes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "usuario_id",
                        type: "uuid",
                    },
                    {
                        name: "curso_id",
                        type: "uuid",
                    },
                    {
                        name: "funcao_id",
                        type: "uuid",
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
                        name: "fk_usuario",
                        columnNames: ["usuario_id"],
                        referencedTableName: "usuarios",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "fk_curso",
                        columnNames: ["curso_id"],
                        referencedTableName: "cursos",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "fk_funcao",
                        columnNames: ["funcao_id"],
                        referencedTableName: "funcoes",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("agentes");
    }
}
