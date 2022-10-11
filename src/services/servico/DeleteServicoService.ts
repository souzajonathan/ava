import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Servico } from "../../entities/Servico";

export class DeleteServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Servico);
        const servico = await repo.findOne(id);

        if (!servico) {
            return new Error("Serviço não existe!");
        }

        await repo.delete(id);
    }
}
