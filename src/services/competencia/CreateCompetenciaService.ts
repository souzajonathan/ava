import { isPositive } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";
import { Instituicao } from "../../entities/Instituicao";
import { Ppc } from "../../entities/Ppc";

type CompetenciaRequest = {
    ppc_id: string;
    competencia: string;
    competenciaNumero: number;
    instituicao_id: string;
};

export class CreateCompetenciaService {
    async execute({
        ppc_id,
        competencia,
        competenciaNumero,
        instituicao_id,
    }: CompetenciaRequest) {
        if (!validate(ppc_id)) {
            return new Error("ID de PPC inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!competencia) {
            return new Error("Competência é obrigatória");
        }

        if (!isPositive(competenciaNumero)) {
            return new Error(
                "Insira um número válido em 'número de competência'"
            );
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repo = getRepository(CompetenciasHabilidades);
        const competenciaAlreadyExists = await repo.findOne({
            competenciaNumero,
            ppc_id,
        });
        if (competenciaAlreadyExists) {
            return new Error("Número de competência e habilidade já existente");
        }

        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if (!ppc) {
            return new Error("Ppc não existe!");
        }

        const competHabilidades = repo.create({
            ppc_id,
            competencia,
            competenciaNumero,
            instituicao_id,
        });

        await repo.save(competHabilidades);

        return {
            ...competHabilidades,
            ppc,
        };
    }
}
