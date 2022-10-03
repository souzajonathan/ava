import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Instituicao } from "../../entities/Instituicao";

export class GetOneInstituicaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Instituicao);

        const instituicao = await repo.findOne(id);

        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        return instituicao;
    }

    async instituicaoDefault() {
        const repo = getRepository(Instituicao);

        const instituicao = await repo.findOne({ padrao: true });

        if (instituicao) {
            return instituicao;
        } else {
            return null;
        }
    }
}
