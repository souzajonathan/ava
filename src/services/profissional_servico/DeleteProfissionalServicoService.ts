import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ProfissionalServico } from "../../entities/ProfissionalServico";

export class DeleteProfissionalServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ProfissionalServico);
        const profissionalServico = await repo.findOne(id);

        if (!profissionalServico) {
            return new Error("profissional_serviço não existente!");
        }

        await repo.delete(id);
    }
}
