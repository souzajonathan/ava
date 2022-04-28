import { getRepository } from "typeorm";
import { Disciplina } from "../entities/Disciplina";

type DisciplinaUpdateRequest = {
    id: string;
    name: string;
    area_id: string;
};

export class UpdateDisciplinaService {
    async execute ({id, name, area_id}: DisciplinaUpdateRequest) {
        const repo = getRepository(Disciplina);

        const disciplina = await repo.findOne(id);

        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        disciplina.name = name ? name : disciplina.name;
        disciplina.area_id = area_id ? area_id : disciplina.area_id;

        await repo.save(disciplina);

        return disciplina;
    }
}