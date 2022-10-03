import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class DeletePpcDisciplinaVersaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.findOne(id);

        if (!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existente!");
        }

        await repo.delete(id);
    }
}
