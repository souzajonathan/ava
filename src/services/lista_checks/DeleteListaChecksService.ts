import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ListaChecks } from "../../entities/ListaChecks";

export class DeleteListaChecksService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ListaChecks);
        const listaChecks = await repo.findOne(id);

        if (!listaChecks) {
            return new Error("Lista de checks de tipo de serviço não existe!");
        }

        await repo.delete(id);
    }
}
