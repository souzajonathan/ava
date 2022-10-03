import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class GetAllPpcDisciplinaVersoesService {
    async execute(instituicao_id?: string) {
        const repo = getRepository(PpcDisciplinaVersao);

        const where: FindConditions<PpcDisciplinaVersao> = {};

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const ppcDisciplinaVersoes = await repo.find({
            relations: ["ppc", "versoes", "perfis", "competencias"],
        });

        return ppcDisciplinaVersoes;
    }

    async findByPerfil(perfil_id: string, instituicao_id?: string) {
        if (!validate(perfil_id)) {
            return new Error("ID inválido");
        }
        const repo = getRepository(PpcDisciplinaVersao);

        const where: FindConditions<PpcDisciplinaVersao> = {};

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const ppcDisciplinaVersoes = await repo
            .createQueryBuilder("pcdv")
            .leftJoinAndSelect("pcdv.versoes", "versoes")
            .leftJoinAndSelect("pcdv.perfis", "perfis")
            .leftJoinAndSelect("versoes.disciplina", "disciplina")
            .where("perfis.id = :id", { id: perfil_id })
            .getMany();

        if (!ppcDisciplinaVersoes.length) {
            return new Error(
                "Não foram encontrados PPC's cadastrados com esse perfil"
            );
        }

        return ppcDisciplinaVersoes;
    }

    async findByCompetencia(competencia_id: string, instituicao_id?: string) {
        if (!validate(competencia_id)) {
            return new Error("ID inválido");
        }
        const repo = getRepository(PpcDisciplinaVersao);

        const where: FindConditions<PpcDisciplinaVersao> = {};

        if (instituicao_id) {
            if (!validate(instituicao_id)) {
                return new Error("ID de instituição inválido");
            }
            where.instituicao_id = instituicao_id;
        }

        const ppcDisciplinaVersoes = await repo
            .createQueryBuilder("pcdv")
            .leftJoinAndSelect("pcdv.versoes", "versoes")
            .leftJoinAndSelect("pcdv.competencias", "competencias")
            .leftJoinAndSelect("versoes.disciplina", "disciplina")
            .where("competencias.id = :id", { id: competencia_id })
            .getMany();

        if (!ppcDisciplinaVersoes.length) {
            return new Error(
                "Não foram encontrados PPC's cadastrados com essa competência"
            );
        }

        return ppcDisciplinaVersoes;
    }
}
