import { getRepository } from "typeorm";
import { CheckTipoServico } from "../../entities/CheckTipoServico";

export class GetAllChecksTipoServicoService {
    async execute() {
        const repo = getRepository(CheckTipoServico);

        const checksTipoServico = await repo.find({
            relations: ["tipoServico", "tipoComponente", "listasCheck"],
        });

        return checksTipoServico;
    }
}
