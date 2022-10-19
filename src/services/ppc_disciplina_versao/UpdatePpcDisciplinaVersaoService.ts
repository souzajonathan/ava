import { isInt, isNegative } from "class-validator";
import { getRepository, In } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Instituicao } from "../../entities/Instituicao";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
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
    instituicao_id: string;
};

export class UpdatePpcDisciplinaVersaoService {
    async execute({
        id,
        ppc_id,
        disciplina_versao_id,
        modulo,
        semestre,
        competencias_id,
        perfis_id,
        instituicao_id,
    }: PpcDisciplinaVersaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (ppc_id && !validate(ppc_id)) {
            return new Error("ID de PPC inválido");
        }

        if (disciplina_versao_id && !validate(disciplina_versao_id)) {
            return new Error("ID de versão de disciplina inválido");
        }

        if (instituicao_id && !validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
            }
        }

        if (modulo && (!isInt(modulo) || isNegative(modulo))) {
            return new Error("Insira um número válido em módulo");
        }

        if (semestre && (!isInt(semestre) || isNegative(semestre))) {
            return new Error("Insira um número válido em semestre");
        }

        if (perfis_id) {
            const invalidId = perfis_id.some((perfil_id) => {
                return !validate(perfil_id);
            });

            if (invalidId) {
                return new Error("ID('s) de perfil(s) inválido(s)");
            }
        }

        if (competencias_id) {
            const invalidId = competencias_id.some((competencia_id) => {
                return !validate(competencia_id);
            });

            if (invalidId) {
                return new Error("ID('s) de competência(s) inválido(s)");
            }
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
        const disciplinaVersao = await repoDisciplinaVersao.findOne(
            disciplina_versao_id
        );
        if (!disciplinaVersao) {
            return new Error("Disciplina não existe!");
        }

        if (perfis_id && perfis_id.length) {
            const repoPerfis = getRepository(PerfisEgresso);

            const perfis = await repoPerfis.find({
                where: { id: In(perfis_id) },
            });

            if (!(perfis.length > 0)) {
                return new Error("Perfil(s) não encontrado(s)");
            }

            ppcDisciplinaVersao.perfis = perfis;
        } else {
            ppcDisciplinaVersao.perfis = [];
        }

        if (competencias_id && competencias_id.length) {
            const repoCompetencias = getRepository(CompetenciasHabilidades);

            const competencias = await repoCompetencias.find({
                where: { id: In(competencias_id) },
            });

            if (!(competencias.length > 0)) {
                return new Error("Competência(s) não encontrada(s)");
            }

            ppcDisciplinaVersao.competencias = competencias;
        } else {
            ppcDisciplinaVersao.competencias = [];
        }

        ppcDisciplinaVersao.ppc_id = ppc_id
            ? ppc_id
            : ppcDisciplinaVersao.ppc_id;
        ppcDisciplinaVersao.disciplina_versao_id = disciplina_versao_id
            ? disciplina_versao_id
            : ppcDisciplinaVersao.disciplina_versao_id;
        ppcDisciplinaVersao.modulo = modulo
            ? modulo
            : ppcDisciplinaVersao.modulo;
        ppcDisciplinaVersao.semestre = semestre
            ? semestre
            : ppcDisciplinaVersao.semestre;
        ppcDisciplinaVersao.instituicao_id = instituicao_id
            ? instituicao_id
            : ppcDisciplinaVersao.instituicao_id;

        await repo.save(ppcDisciplinaVersao);

        return {
            ...ppcDisciplinaVersao,
            ppc,
            disciplinaVersao,
        };
    }
}
