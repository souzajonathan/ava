import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ProfissionalServico } from "../../entities/ProfissionalServico";

export class DeleteProfissionalServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ProfissionalServico);
        const profissionalServico = await repo.findOne(id, {
            relations: ["listasCheck"],
        });

        if (!profissionalServico) {
            return new Error("Profissional num servico não existente!");
        }

        if (profissionalServico.listasCheck.length > 0) {
            return new Error(
                "Profissional num servico com lista(s) de check de serviço cadastrada(s)"
            );
        }

        await repo.delete(id);
    }
}
