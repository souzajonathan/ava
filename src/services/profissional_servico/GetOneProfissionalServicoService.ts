import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ProfissionalServico } from "../../entities/ProfissionalServico";

export class GetOneProfissionalServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ProfissionalServico);

        const profissionalServico = await repo.findOne(id, {
            relations: ["servico", "profissional"],
        });

        if (!profissionalServico) {
            return new Error("profissional_serviço não existe!");
        }

        return profissionalServico;
    }
}
