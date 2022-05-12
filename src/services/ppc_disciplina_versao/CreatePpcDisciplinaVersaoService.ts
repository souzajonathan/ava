import { getRepository, In } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PpcDisciplinaVersaoRequest = {
    ppc_id: string;
    disciplina_versao_id: string;
    modulo: string;
    semestre: string;
    competencias_id: string[];
    perfis_id: string[];
}

export class CreatePpcDisciplinaVersaoService {
    async execute ({ppc_id, disciplina_versao_id, modulo, semestre, perfis_id, competencias_id}: PpcDisciplinaVersaoRequest) {
        const repo = getRepository(PpcDisciplinaVersao);
        const repoPpc = getRepository(Ppc);
        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const repoPerfis = getRepository(PerfilEgresso);
        const repoCompetencias = getRepository(CompetHabilidades);

        const ppc = await repoPpc.findOne(ppc_id);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);
        const perfis = await repoPerfis.find({where: {id: In(perfis_id)}});
        const competencias = await repoCompetencias.find({where: {id: In(competencias_id)}});

        if(!ppc) {
            return new Error("Ppc não existe!");
        }

        if(!disciplinaVersao) {
            return new Error("Versão de disciplina não existe!");
        }

        const ppcDisciplinaVersao = repo.create({ppc_id, disciplina_versao_id, modulo, semestre, perfis, competencias});

        await repo.save(ppcDisciplinaVersao);

        return {
            ...ppcDisciplinaVersao, ppc, disciplinaVersao
        };
    }
}