import { getRepository, In } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PpcDisciplinaVersaoRequest = {
    ppc_id: string;
    disciplina_versao_id: string;
    modulo: number;
    semestre: number;
    competencias_id: string[];
    perfis_id: string[];
}

export class CreatePpcDisciplinaVersaoService {
    async execute ({ppc_id, disciplina_versao_id, modulo, semestre, perfis_id, competencias_id}: PpcDisciplinaVersaoRequest) {
        if (!validate(ppc_id && disciplina_versao_id)){
            return new Error("ID's inválidos");
        }

        const repo = getRepository(PpcDisciplinaVersao);
        const repoPpc = getRepository(Ppc);
        const repoDisciplinaVersao = getRepository(DisciplinaVersao);

        const ppc = await repoPpc.findOne(ppc_id);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);

        if(!ppc) {
            return new Error("Ppc não existe!");
        }

        if(!disciplinaVersao) {
            return new Error("Versão de disciplina não existe!");
        }

        const ppcDisciplinaVersao = repo.create({ ppc_id, disciplina_versao_id, modulo, semestre });

        let ppcDisciplinaVersaoCreated = await repo.save(ppcDisciplinaVersao);

        if (perfis_id && perfis_id.length > 0) {
            const repoPerfis = getRepository(PerfilEgresso);

            const perfis = await repoPerfis.find({where: {id: In(perfis_id)}});

            if(!(perfis.length > 0)){
                return new Error("Perfil(s) não encontrado(s)");
            }

            ppcDisciplinaVersaoCreated.perfis = perfis;

            ppcDisciplinaVersaoCreated = await repo.save(ppcDisciplinaVersaoCreated);
        }

        if (competencias_id && competencias_id.length > 0) {
            const repoCompetencias = getRepository(CompetenciasHabilidades);

            const competencias = await repoCompetencias.find({where: {id: In(competencias_id)}});

            if(!(competencias.length > 0)){
                return new Error("Competência(s) não encontrada(s)");
            }

            ppcDisciplinaVersaoCreated.competencias = competencias;

            ppcDisciplinaVersaoCreated = await repo.save(ppcDisciplinaVersaoCreated);
        }

        return {
            ...ppcDisciplinaVersaoCreated, ppc, disciplinaVersao
        };
    }
}