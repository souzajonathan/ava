import { getRepository } from "typeorm";
import { ListaChecks } from "../../entities/ListaChecks";

export class GetAllListasChecksService {
    async execute() {
        const repo = getRepository(ListaChecks);

        const listasChecks = await repo.find({
            relations: [
                "checkTipoServico",
                "profissionalServico",
                "versaoComponentePedido",
            ],
        });

        return listasChecks;
    }
}
