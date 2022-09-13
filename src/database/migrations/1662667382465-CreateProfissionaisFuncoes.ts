import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfissionaisFuncoes1662667382465
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "profissionais_funcoes",
                columns: [
                    {
                        name: "profissional_id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "funcao_id",
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
                        name: "fk_profissional",
                        columnNames: ["profissional_id"],
                        referencedTableName: "profissionais",
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
        await queryRunner.dropTable("profissionais_funcoes");
    }
}
