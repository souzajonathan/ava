import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetOnePpcDisciplinaVersaoService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.findOne(id, {
            relations: [
                "ppc",
                "versao",
                "perfis",
                "competencias",
                "versao.disciplina",
            ],
        });

        if (!ppcDisciplinaVersao) {
            return new Error("PpcDisciplinaVersao não existe!");
        }

        if (ppcDisciplinaVersao.instituicao_id != instituicao_id) {
            return new Error(
                "Essa instituição não contém esse ppcDisciplinaVersao"
            );
        }

        return ppcDisciplinaVersao;
    }
}
