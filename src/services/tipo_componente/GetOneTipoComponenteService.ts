import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposComponentes } from "../../entities/TiposComponentes";

export class GetOneTipoComponenteService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposComponentes);

        const tipo = await repo.findOne(id, {
            relations: [
                "componentesTrilha",
                "componentesPedido",
                "trilhasServicos",
                "checksTipoServico",
            ],
        });

        if (!tipo) {
            return new Error("Tipo de componente não existe!");
        }

        return tipo;
    }
}
