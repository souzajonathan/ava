import { getRepository } from "typeorm";
import { Profissional } from "../../entities/Profissional";

export class GetAllProfissionaisService {
    async execute() {
        const repo = getRepository(Profissional);

        const profissionais = await repo.find({
            relations: ["profissionalServicos"],
        });

        return profissionais;
    }
}
