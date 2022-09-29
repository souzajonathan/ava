import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Instituicao } from "../../entities/Instituicao";

export class DeleteInstituicaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Instituicao);
        const instituicao = await repo.findOne(id);

        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        await repo.delete(id);
    }
}
