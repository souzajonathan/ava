import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

export class DeleteTrilhaServicosService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TrilhaServicos);
        const trilha = await repo.findOne(id, {
            relations: ["servicosTrilhaServicos"],
        });

        if (!trilha) {
            return new Error("Trilha de serviços não existe!");
        }

        if (trilha.servicosTrilhaServicos.length > 0) {
            return new Error("Trilha de serviços com serviços cadastrados");
        }

        await repo.delete(id);
    }
}
