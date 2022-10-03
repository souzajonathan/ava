import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type CompetenciaPpcDisciplinaVersaoRequest = {
    competencia_id: string;
    ppcDisciplinaVersao_id: string;
    instituicao_id: string;
};

export class CreateCompetenciaPpcDisciplinaVersaoService {
    async execute({
        competencia_id,
        ppcDisciplinaVersao_id,
        instituicao_id,
    }: CompetenciaPpcDisciplinaVersaoRequest) {
        if (!validate(competencia_id)) {
            return new Error("ID de competência inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!validate(ppcDisciplinaVersao_id)) {
            return new Error("ID de Ppc_disciplina_versão inválido");
        }

        const repoCompetencias = getRepository(CompetenciasHabilidades);
        const competencia = await repoCompetencias.findOne(competencia_id);
        if (!competencia) {
            return new Error("Competência não existe!");
        }

        const repo = getRepository(PpcDisciplinaVersao);
        const ppcDisciplinaVersao = await repo.findOne(ppcDisciplinaVersao_id, {
            relations: ["perfis", "competencias"],
        });
        if (!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existe!");
        }

        ppcDisciplinaVersao.competencias = [
            ...ppcDisciplinaVersao.competencias,
            competencia,
        ];
        ppcDisciplinaVersao.instituicao_id = instituicao_id;

        await repo.save(ppcDisciplinaVersao);

        return ppcDisciplinaVersao;
    }
}
