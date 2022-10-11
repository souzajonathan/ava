import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposServicos } from "../../entities/TiposServicos";

export class DeleteTipoServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposServicos);
        const tipo = await repo.findOne(id, {
            relations: ["servicos"],
        });

        if (!tipo) {
            return new Error("Tipo de solicitação não existe!");
        }

        if (tipo.servicos.length > 0) {
            return new Error("Tipo de serviço com serviços cadastrados");
        }

        await repo.delete(id);
    }
}
