import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Profissional } from "../../entities/Profissional";

export class GetOneProfissionalService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Profissional);

        const profissional = await repo.findOne(id, {
            relations: ["profissionalServicos"],
        });

        if (!profissional) {
            return new Error("Profissional não existe!");
        }

        return profissional;
    }
}
