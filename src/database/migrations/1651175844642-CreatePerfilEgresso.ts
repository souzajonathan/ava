import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePerfilEgresso1651175844642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "perfil_egresso",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "perfilNumero",
                        type: "varchar"
                    },
                    {
                        name: "perfil",
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
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("perfil_egresso");
    }

}
