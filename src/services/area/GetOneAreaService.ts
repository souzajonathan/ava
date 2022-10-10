import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";
import { validate } from "uuid";

export class GetOneAreaService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(Area);

        const area = await repo.findOne(id, {
            relations: ["disciplinas"],
        });

        if (!area) {
            return new Error("Área não existe!");
        }

        if (area.instituicao_id != instituicao_id) {
            return new Error("Essa instituição não contém essa área");
        }

        return area;
    }
}
