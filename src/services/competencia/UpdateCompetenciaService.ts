import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { Instituicao } from "../../entities/Instituicao";
import { Ppc } from "../../entities/Ppc";

type CompetenciaUpdateRequest = {
    id: string;
    ppc_id: string;
    competencia: string;
    competenciaNumero: number;
    instituicao_id: string;
};

export class UpdateCompetenciaService {
    async execute({
        id,
        ppc_id,
        competencia,
        competenciaNumero,
        instituicao_id,
    }: CompetenciaUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (ppc_id && !validate(ppc_id)) {
            return new Error("ID de PPC inválido");
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

        if (competenciaNumero && !Number.isInteger(competenciaNumero)) {
            return new Error(
                "Insira um número válido em número de competência"
            );
        }

        const repo = getRepository(CompetenciasHabilidades);
        const competHabilidades = await repo.findOne(id);
        if (!competHabilidades) {
            return new Error("Competências e Habilidades não existente!");
        }

        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if (!ppc) {
            return new Error("Ppc não existente!");
        }

        competHabilidades.ppc_id = ppc_id ? ppc_id : competHabilidades.ppc_id;
        competHabilidades.competencia = competencia
            ? competencia
            : competHabilidades.competencia;
        competHabilidades.competenciaNumero = competenciaNumero
            ? competenciaNumero
            : competHabilidades.competenciaNumero;
        competHabilidades.instituicao_id = instituicao_id
            ? instituicao_id
            : competHabilidades.instituicao_id;
        competHabilidades.instituicao_id = instituicao_id
            ? instituicao_id
            : competHabilidades.instituicao_id;

        await repo.save(competHabilidades);

        return {
            ...competHabilidades,
            ppc,
        };
    }
}
