import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CompetenciasHabilidades } from "../../entities/CompetenciasHabilidades";

export class GetOneCompetenciaService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(CompetenciasHabilidades);

        const competencia = await repo
            .createQueryBuilder("competencia")
            .where({
                id: id,
            })
            .leftJoinAndSelect("competencia.ppc", "ppc")
            .leftJoinAndSelect(
                "ppc.ppcDisciplinaVersoes",
                "ppcDisciplinaVersoes"
            )
            .leftJoinAndSelect("ppcDisciplinaVersoes.versao", "versao")
            .getOne();

        if (!competencia) {
            return new Error("Competência não existe!");
        }

        if (competencia.instituicao_id != instituicao_id) {
            return new Error("Essa instituição não contém essa competência");
        }

        return competencia;
    }
}
