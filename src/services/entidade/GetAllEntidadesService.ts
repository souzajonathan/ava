import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { Entidade } from "../../entities/Entidade";

export class GetAllEntidadesService {
    async execute(instituicao_id?: string) {
        const repo = getRepository(Entidade);

        const where: FindConditions<Entidade> = {};

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const entidades = await repo.find({
            relations: ["especificacoes", "instituicao"],
            where,
        });

        return entidades;
    }
}
