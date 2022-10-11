import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Agente } from "../../entities/Agente";

export class DeleteAgenteService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Agente);
        const agente = await repo.findOne(id);

        if (!agente) {
            return new Error("Agente não existe!");
        }

        await repo.delete(id);
    }
}
