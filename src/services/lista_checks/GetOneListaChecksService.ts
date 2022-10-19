import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ListaChecks } from "../../entities/ListaChecks";

export class GetOneListaChecksService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ListaChecks);

        const listaChecks = await repo.findOne(id, {
            relations: [
                "checkTipoServico",
                "profissionalServico",
                "versaoComponentePedido",
            ],
        });

        if (!listaChecks) {
            return new Error("Lista de checks de tipo de serviço não existe!");
        }

        return listaChecks;
    }
}
