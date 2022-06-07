import { getRepository, In } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PpcDisciplinaVersaoUpdateRequest = {
    id: string;
    ppc_id: string;
    disciplina_versao_id: string;
    modulo: number;
    semestre: number;
    competencias_id: string[];
    perfis_id: string[];
};

export class UpdatePpcDisciplinaVersaoService {
    async execute ({id, ppc_id, disciplina_versao_id, modulo, semestre, competencias_id, perfis_id}: PpcDisciplinaVersaoUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(PpcDisciplinaVersao);
        const repoPpc = getRepository(Ppc);
        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const repoPerfis = getRepository(PerfilEgresso);
        const repoCompetencias = getRepository(CompetenciasHabilidades);

        const ppcDisciplinaVersao = await repo.findOne(id);
        const ppc = await repoPpc.findOne(ppc_id);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);
        const perfis = await repoPerfis.find({where: {id: In(perfis_id) }});
        const competencias = await repoCompetencias.find({where: {id: In(competencias_id) }});

        if (!ppcDisciplinaVersao) {
            return new Error("PPC_Disciplina_Versão não existente!");
        }

        if (!ppc) {
            return new Error("Ppc não existe!");
        }

        if (!disciplinaVersao) {
            return new Error("Disciplina não existe!");
        }

        ppcDisciplinaVersao.ppc_id = ppc_id ? ppc_id : ppcDisciplinaVersao.ppc_id;
        ppcDisciplinaVersao.disciplina_versao_id = disciplina_versao_id ? disciplina_versao_id : ppcDisciplinaVersao.disciplina_versao_id;
        ppcDisciplinaVersao.modulo = modulo ? modulo : ppcDisciplinaVersao.modulo;
        ppcDisciplinaVersao.semestre = semestre ? semestre : ppcDisciplinaVersao.semestre;
        ppcDisciplinaVersao.competencias = competencias ? competencias : ppcDisciplinaVersao.competencias;
        ppcDisciplinaVersao.perfis = perfis ? perfis : ppcDisciplinaVersao.perfis;

        await repo.save(ppcDisciplinaVersao);

        return {
            ...ppcDisciplinaVersao, ppc, disciplinaVersao
        };
    }
}