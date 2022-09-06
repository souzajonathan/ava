import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePedido1661777435552 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "pedidos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "disciplina_versao_id",
                        type: "uuid",
                    },
                    {
                        name: "tipo_solicitacao_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "data_entrega",
                        type: "timestamp with time zone",
                        isNullable: true,
                    },
                    {
                        name: "analisado",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "aprovacao_interna",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "aprovacao_externa",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "concluido",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "observacoes",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "solicitante_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "responsavel_id",
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
                        name: "fk_disciplinas_area",
                        columnNames: ["disciplina_versao_id"],
                        referencedTableName: "disciplina_versao",
                        referencedColumnNames: ["id"],
                    },
                    {
                        name: "fk_tipos_solicitacao",
                        columnNames: ["tipo_solicitacao_id"],
                        referencedTableName: "tipos_solicitacao",
                        referencedColumnNames: ["id"],
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos");
    }
}
