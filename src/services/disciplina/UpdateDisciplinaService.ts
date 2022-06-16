import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";
import { Disciplina } from "../../entities/Disciplina";

type DisciplinaUpdateRequest = {
    id: string;
    name: string;
    area_id: string;
    sigla: string;
}

export class UpdateDisciplinaService {
    async execute ({id, name, area_id, sigla}: DisciplinaUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        if(area_id && !validate(area_id)){
            return new Error("ID de área inválido");
        }
        
        const repo = getRepository(Disciplina);
        const disciplina = await repo.findOne(id);
        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const repoArea = getRepository(Area);
        const area = await repoArea.findOne(area_id);
        if (!area) {
            return new Error("Área não existe!");
        }

        disciplina.name = name ? name : disciplina.name;
        disciplina.area_id = area_id ? area_id : disciplina.area_id;
        disciplina.sigla = sigla ? sigla : disciplina.sigla;

        await repo.save(disciplina);

        return {
            ...disciplina, area
        };
    }
}