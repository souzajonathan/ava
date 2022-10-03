import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePerfisEgresso1651175844642 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "perfis_egresso",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "perfilNumero",
                        type: "int",
                    },
                    {
                        name: "perfil",
                        type: "varchar",
                    },
                    {
                        name: "ppc_id",
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
                    {
                        name: "instituicao_id",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_ppc",
                        columnNames: ["ppc_id"],
                        referencedTableName: "ppcs",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
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
        await queryRunner.dropTable("perfis_egresso");
    }
}
