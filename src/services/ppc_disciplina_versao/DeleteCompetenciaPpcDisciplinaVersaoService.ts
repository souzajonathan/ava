import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type CompetenciaPpcDisciplinaVersaoRequest = {
    competencia_id: string;
    ppcDisciplinaVersao_id: string;
}

export class DeleteCompetenciaPpcDisciplinaVersaoService {
    async execute ({competencia_id, ppcDisciplinaVersao_id}: CompetenciaPpcDisciplinaVersaoRequest) {
        if (!validate(competencia_id)){
            return new Error("ID de competência inválido");
        }

        if (!validate(ppcDisciplinaVersao_id)){
            return new Error("ID de Ppc_disciplina_versão inválido");
        }
        
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.findOne(ppcDisciplinaVersao_id, {relations: ["competencias"]});

        if(!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existe!");
        }

        ppcDisciplinaVersao.competencias = ppcDisciplinaVersao.competencias.filter( (competencia) => {
            return competencia.id !== competencia_id;
        });

        await repo.save(ppcDisciplinaVersao);

        return ppcDisciplinaVersao;
    }
}