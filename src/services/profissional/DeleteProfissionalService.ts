import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Profissional } from "../../entities/Profissional";

export class DeleteProfissionalService {
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

        if (profissional.profissionalServicos.length > 0) {
            return new Error("Profissional com serviços cadastrados");
        }

        await repo.delete(id);
    }
}
