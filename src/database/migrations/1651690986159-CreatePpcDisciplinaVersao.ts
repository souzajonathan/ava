import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePpcDisciplinaVersao1651690986159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: "interligPpcVersaodisciplina",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

    }

}
