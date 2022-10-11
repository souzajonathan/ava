import { getRepository } from "typeorm";
import { Agente } from "../../entities/Agente";

export class GetAllAgentesService {
    async execute() {
        const repo = getRepository(Agente);

        const agentes = await repo.find({
            relations: ["usuario", "curso", "funcao"],
        });

        return agentes;
    }
}
