import { getRepository } from "typeorm";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetAllPpcDisciplinaVersoesService {
    async execute() {
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersoes = await repo.find({
            relations: ["ppc", "versoes", "perfis", "competencias"],
            where: ["perfis"],
        });

        return ppcDisciplinaVersoes;
    }

    async findByPerfil(perfil_id: string) {
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersoes = await repo
            .createQueryBuilder("pcdv")
            .leftJoinAndSelect("pcdv.versoes", "versoes")
            .leftJoinAndSelect("pcdv.perfis", "perfis")
            .where("perfis.id = :id", { id: perfil_id })
            .getMany();

        return ppcDisciplinaVersoes;
    }

    async findByCompetencia(competencia_id: string) {
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersoes = await repo
            .createQueryBuilder("pcdv")
            .leftJoinAndSelect("pcdv.versoes", "versoes")
            .leftJoinAndSelect("pcdv.competencias", "competencias")
            .where("competencias.id = :id", { id: competencia_id })
            .getMany();

        return ppcDisciplinaVersoes;
    }
}
