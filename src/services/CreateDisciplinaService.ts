import { getRepository } from "typeorm";
import { Area } from "../entities/Area";
import { Disciplina } from "../entities/Disciplina";


type DisciplinaRequest = {
    name: string;
    area_id: string;
}

export class CreateDisciplinaService {
    async execute ({name, area_id}: DisciplinaRequest) {
        const repo = getRepository(Disciplina);
        const repoArea = getRepository(Area);

        const area = await repoArea.findOne(area_id)

        if(!area) {
            return new Error("Área não existe!");
        }

        const disciplinaSameName = await repo.findOne({
            where: {
                name: name
            }
        })

        if (disciplinaSameName) {
            return new Error("Disciplina já existe!");
        }

        const disciplina = repo.create({name, area_id});
        
        await repo.save(disciplina);

        return {
            ...disciplina, area
        }
    }
}