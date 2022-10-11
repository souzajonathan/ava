import { getRepository } from "typeorm";
import { ProfissionalServico } from "../../entities/ProfissionalServico";

export class GetAllProfissionalServicoService {
    async execute() {
        const repo = getRepository(ProfissionalServico);

        const profissionalServico = await repo.find({
            relations: ["servico", "profissional"],
        });

        return profissionalServico;
    }
}
