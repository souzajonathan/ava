import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";
import { Disciplina } from "../../entities/Disciplina";

type DisciplinaUpdateRequest = {
    id: string;
    name: string;
    area_id: string;
    sigla: string;
};

export class UpdateDisciplinaService {
    async execute ({id, name, area_id, sigla}: DisciplinaUpdateRequest) {
        const repo = getRepository(Disciplina);
        const repoArea = getRepository(Area);

        const disciplina = await repo.findOne(id);
        const area = await repoArea.findOne(area_id);

        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        if (!area) {
            return new Error("Área não existe!");
        }

        disciplina.name = name ? name : disciplina.name;
        disciplina.area_id = area_id ? area_id : disciplina.area_id;
        disciplina.sigla = sigla ? sigla : disciplina.sigla;

        await repo.save(disciplina);

        return disciplina;
    }
}