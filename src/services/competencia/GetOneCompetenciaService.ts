import { getRepository } from "typeorm";
import { CompetHabilidades } from "../../entities/CompetHabilidades";

export class GetOneCompetenciaService {
    async execute(id: string) {
        const repo = getRepository(CompetHabilidades);

        /* const competencia = await repo.findOne(id, {
            relations: ["ppc"]
        }); */

        const competencia = await repo
            .createQueryBuilder("competencia")
            .where({
                id: id
            })
            .leftJoinAndSelect("competencia.ppc", "ppc")
            .leftJoinAndSelect("ppc.versoesPdv", "versoesPdv")
            .leftJoinAndSelect("versoesPdv.versoes", "versoes")
            .getMany();

        if (!competencia) {
            return new Error("Competência não existe!");
        }

        return competencia;
    }

}