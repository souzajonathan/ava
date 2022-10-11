import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

export class GetOneTrilhaServicosService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TrilhaServicos);

        const trilha = await repo.findOne(id, {
            relations: ["servicosTrilhaServicos", "tipoComponente"],
        });

        if (!trilha) {
            return new Error("Trilha de serviços não existe!");
        }

        return trilha;
    }
}
