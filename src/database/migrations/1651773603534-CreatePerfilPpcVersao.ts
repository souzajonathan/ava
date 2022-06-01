import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePerfilPpcVersao1651773603534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "perfil_ppc_versao",
                columns: [
                    {
                        name: "perfil_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "ppc_disciplina_versao_id",
                        type: "uuid",
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_perfil",
                        columnNames: ["perfil_id"],
                        referencedTableName: "perfilEgresso",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_ppc_disciplina_versao",
                        columnNames: ["ppc_disciplina_versao_id"],
                        referencedTableName: "ppcDisciplinaVersao",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("perfil_ppc_versao");
    }

}
