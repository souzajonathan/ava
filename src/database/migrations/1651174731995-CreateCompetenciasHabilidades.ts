import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompetenciasHabilidades1651174731995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "competencias_habilidades",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "competenciaNumero",
                        type: "varchar"
                    },
                    {
                        name: "competencia",
                        type: "varchar"
                    },
                    {
                        name: "ppc_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_ppc",
                        columnNames: ["ppc_id"],
                        referencedTableName: "ppcs",
                        referencedColumnNames: ["id"],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("competencias_habilidades");
    }

}
