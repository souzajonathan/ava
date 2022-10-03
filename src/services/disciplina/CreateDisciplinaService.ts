import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";
import { Disciplina } from "../../entities/Disciplina";

type DisciplinaRequest = {
    name: string;
    area_id: string;
    sigla: string;
    instituicao_id: string;
};

export class CreateDisciplinaService {
    async execute({ name, area_id, sigla, instituicao_id }: DisciplinaRequest) {
        if (!name) {
            return new Error("Nome de disciplina é obrigatório");
        }

        if (!sigla) {
            return new Error("Sigla é obrigatório");
        }

        if (!validate(area_id)) {
            return new Error("ID de área inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repoArea = getRepository(Area);
        const area = await repoArea.findOne(area_id);
        if (!area) {
            return new Error("Área não existe!");
        }

        const repo = getRepository(Disciplina);
        const siglaAlreadyExists = await repo.findOne({
            where: { sigla },
        });
        if (siglaAlreadyExists) {
            return new Error("Sigla já existe!");
        }

        const disciplina = repo.create({
            name,
            area_id,
            sigla,
            instituicao_id,
        });

        await repo.save(disciplina);

        return {
            ...disciplina,
            area,
        };
    }
}
