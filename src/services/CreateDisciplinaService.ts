import { getRepository } from "typeorm";
import { Area } from "../entities/Area";
import { Disciplina } from "../entities/Disciplina";

type DisciplinaRequest = {
    name: string;
    description: string;
    area_id: string;
}

export class CreateDisciplinaService {
    async execute ({name, description, area_id}: DisciplinaRequest) {
        const repo = getRepository(Disciplina);
        const repoArea = getRepository(Area);

        if(!(await repoArea.findOne(area_id))) {
            return new Error("Área não existe!");
        }

        const disciplina = repo.create({name, description, area_id});
        
        await repo.save(disciplina);

        return disciplina;
    }
}