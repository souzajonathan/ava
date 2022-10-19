import { isInt, isNegative } from "class-validator";
import { getRepository, In } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Instituicao } from "../../entities/Instituicao";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
import { Ppc } from "../../entities/Ppc";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PpcDisciplinaVersaoRequest = {
    ppc_id: string;
    disciplina_versao_id: string;
    modulo: number;
    semestre: number;
    competencias_id: string[];
    perfis_id: string[];
    instituicao_id: string;
};

export class CreatePpcDisciplinaVersaoService {
    async execute({
        ppc_id,
        disciplina_versao_id,
        modulo,
        semestre,
        perfis_id,
        competencias_id,
        instituicao_id,
    }: PpcDisciplinaVersaoRequest) {
        if (!validate(ppc_id)) {
            return new Error("ID de PPC inválido");
        }

        if (!validate(disciplina_versao_id)) {
            return new Error("ID de versão de disciplina inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!isInt(modulo) || isNegative(modulo)) {
            return new Error("Insira um número válido em módulo");
        }

        if (!isInt(semestre) || isNegative(semestre)) {
            return new Error("Insira um número válido em semestre");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        let auxP = false;

        if (perfis_id && perfis_id.length > 0) {
            const invalidId = perfis_id.some((perfil_id) => {
                return !validate(perfil_id);
            });

            if (invalidId) {
                return new Error("ID('s) de perfil(s) inválido(s)");
            }

            auxP = true;
        }

        let auxC = false;

        if (competencias_id && competencias_id.length > 0) {
            const invalidId = competencias_id.some((competencia_id) => {
                return !validate(competencia_id);
            });

            if (invalidId) {
                return new Error("ID('s) de competência(s) inválido(s)");
            }

            auxC = true;
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
            return new Error("Versão de disciplina não existe!");
        }

        const repo = getRepository(PpcDisciplinaVersao);
        const ppcDisciplinaVersao = repo.create({
            ppc_id,
            disciplina_versao_id,
            modulo,
            semestre,
            instituicao_id,
        });
        let ppcDisciplinaVersaoCreated = await repo.save(ppcDisciplinaVersao);

        if (auxP) {
            const repoPerfis = getRepository(PerfisEgresso);

            const perfis = await repoPerfis.find({
                where: { id: In(perfis_id) },
            });

            if (!(perfis.length > 0)) {
                return new Error("Perfil(s) não encontrado(s)");
            }

            ppcDisciplinaVersaoCreated.perfis = perfis;

            ppcDisciplinaVersaoCreated = await repo.save(
                ppcDisciplinaVersaoCreated
            );
        }

        if (auxC) {
            const repoCompetencias = getRepository(CompetenciasHabilidades);

            const competencias = await repoCompetencias.find({
                where: { id: In(competencias_id) },
            });

            if (!(competencias.length > 0)) {
                return new Error("Competência(s) não encontrada(s)");
            }

            ppcDisciplinaVersaoCreated.competencias = competencias;

            ppcDisciplinaVersaoCreated = await repo.save(
                ppcDisciplinaVersaoCreated
            );
        }

        return {
            ...ppcDisciplinaVersaoCreated,
            ppc,
            disciplinaVersao,
        };
    }
}
