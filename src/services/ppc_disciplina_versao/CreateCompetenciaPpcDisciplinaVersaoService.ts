import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetHabilidades } from "../../entities/CompetHabilidades";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type CompetenciaPpcDisciplinaVersaoRequest = {
    competencia_id: string;
    ppcDisciplinaVersao_id: string;
}

export class CreateCompetenciaPpcDisciplinaVersaoService {
    async execute ({competencia_id, ppcDisciplinaVersao_id}: CompetenciaPpcDisciplinaVersaoRequest) {
        if (!validate(competencia_id || ppcDisciplinaVersao_id)){
            return new Error("ID's inválidos");
        }
        const repo = getRepository(PpcDisciplinaVersao);
        const repoCompetencias = getRepository(CompetHabilidades);

        const ppcDisciplinaVersao = await repo.findOne(ppcDisciplinaVersao_id, {relations: ["perfis", "competencias"]});
        const competencia = await repoCompetencias.findOne(competencia_id);

        if(!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existe!");
        }

        if(!competencia) {
            return new Error("Competência não existe!");
        }

        ppcDisciplinaVersao.competencias = [...ppcDisciplinaVersao.competencias, competencia];

        await repo.save(ppcDisciplinaVersao);

        return {
            ppcDisciplinaVersao
        };
    }
}