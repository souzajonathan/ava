import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposServicos } from "../../entities/TiposServicos";

export class GetOneTipoServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposServicos);

        const tipo = await repo.findOne(id, {
            relations: ["servicos"],
        });

        if (!tipo) {
            return new Error("Tipo de serviço não existe!");
        }

        return tipo;
    }
}
