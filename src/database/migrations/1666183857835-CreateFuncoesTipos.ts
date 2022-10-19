import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFuncoesTipos1666183857835 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "funcoes_tipos",
                columns: [
                    {
                        name: "funcao_id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "tipo_id",
                        type: "uuid",
                        isPrimary: true,
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
                        name: "fk_funcao",
                        columnNames: ["funcao_id"],
                        referencedTableName: "funcoes",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "fk_tipo",
                        columnNames: ["tipo_id"],
                        referencedTableName: "tipos_servicos",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("funcoes_tipos");
    }
}
