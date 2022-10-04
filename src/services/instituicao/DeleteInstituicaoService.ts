import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";
import { Curso } from "../../entities/Curso";
import { Instituicao } from "../../entities/Instituicao";

export class DeleteInstituicaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Instituicao);
        const instituicao = await repo.findOne(id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repoCursos = getRepository(Curso);
        const curso = await repoCursos.findOne({ instituicao_id: id });
        if (curso) {
            return new Error("Instituição com curso(s) cadastrado(s)");
        }

        const repoAreas = getRepository(Area);
        const area = await repoAreas.findOne({ instituicao_id: id });
        if (area) {
            return new Error("Instituição com área(s) cadastrada(s)");
        }

        await repo.delete(id);
    }
}
