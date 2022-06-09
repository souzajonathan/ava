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
        if (!validate(id) || !validate(ppc_id) || !validate(disciplina_versao_id)){
            return new Error("ID('s) inválido(s)");
        }

        if(modulo){
            if(!Number.isInteger(modulo)){
                return new Error("Insira um número válido em módulo");
            }
        }

        if(semestre){
            if(!Number.isInteger(semestre)){
                return new Error("Insira um número válido em semestre");
            }
        }

        let auxP = false;

        if (perfis_id && perfis_id.length > 0) {

            const invalideId = perfis_id.some( (perfil_id) => {
                return !validate(perfil_id);
            });
            
            if(invalideId){
                return new Error("ID('s) de perfil(s) inválido(s)");
            }

            auxP = true;
        }

        let auxC = false;

        if (competencias_id && competencias_id.length > 0) {

            const invalideId = competencias_id.some( (competencia_id) => {
                return !validate(competencia_id);
            });
            
            if(invalideId){
                return new Error("ID('s) de competência(s) inválido(s)");
            }

            auxC = true;
        }

        const repo = getRepository(PpcDisciplinaVersao);
        const ppcDisciplinaVersao = await repo.findOne(id);
        if (!ppcDisciplinaVersao) {
            return new Error("PPC_Disciplina_Versão não existente!");
        }

        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if (!ppc) {
            return new Error("Ppc não existe!");
        }

        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);
        if (!disciplinaVersao) {
            return new Error("Disciplina não existe!");
        }

        if (auxP) {
            const repoPerfis = getRepository(PerfilEgresso);

            const perfis = await repoPerfis.find({where: {id: In(perfis_id)}});
            
            if(!(perfis.length > 0)){
                return new Error("Perfil(s) não encontrado(s)");
            }
            
            ppcDisciplinaVersao.perfis = perfis;
        }

        if (auxC) {
            const repoCompetencias = getRepository(CompetenciasHabilidades);

            const competencias = await repoCompetencias.find({where: {id: In(competencias_id)}});

            if(!(competencias.length > 0)){
                return new Error("Competência(s) não encontrada(s)");
            }

            ppcDisciplinaVersao.competencias = competencias;
        }

        ppcDisciplinaVersao.ppc_id = ppc_id ? ppc_id : ppcDisciplinaVersao.ppc_id;
        ppcDisciplinaVersao.disciplina_versao_id = disciplina_versao_id ? disciplina_versao_id : ppcDisciplinaVersao.disciplina_versao_id;
        ppcDisciplinaVersao.modulo = modulo ? modulo : ppcDisciplinaVersao.modulo;
        ppcDisciplinaVersao.semestre = semestre ? semestre : ppcDisciplinaVersao.semestre;

        await repo.save(ppcDisciplinaVersao);

        return {
            ...ppcDisciplinaVersao, ppc, disciplinaVersao
        };
    }
}