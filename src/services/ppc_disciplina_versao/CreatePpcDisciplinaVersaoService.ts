import { getRepository, In } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";
import { Disciplina } from "../../entities/Disciplina";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PpcDisciplinaVersaoRequest = {
    ppc_id: string;
    disciplina_id: string;
    modulo: string;
    semestre: string;
    competencias_id: string[];
    perfis_id: string[];
}

export class CreatePpcDisciplinaVersaoService {
    async execute ({ppc_id, disciplina_id, modulo, semestre, perfis_id, competencias_id}: PpcDisciplinaVersaoRequest) {
        const repo = getRepository(PpcDisciplinaVersao);
        const repoPpc = getRepository(Ppc);
        const repoDisciplina = getRepository(Disciplina);
        const repoPerfis = getRepository(PerfilEgresso);
        const repoCompetencias = getRepository(CompetHabilidades);

        const ppc = await repoPpc.findOne(ppc_id);
        const disciplina = await repoDisciplina.findOne(disciplina_id);
        const perfis = await repoPerfis.find({where: {id: In(perfis_id) }});
        const competencias = await repoCompetencias.find({where: {id: In(competencias_id) }});

        if(!ppc) {
            return new Error("Ppc não existe!");
        }

        if(!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const ppcDisciplinaVersao = repo.create({ppc_id, disciplina_id, modulo, semestre, perfis, competencias});

        await repo.save(ppcDisciplinaVersao);

        return {
            ...ppc, disciplina
        }
    }
}