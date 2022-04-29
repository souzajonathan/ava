import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

export class DeleteCursoService {
    async execute(id: string) {
        const repo = getRepository(Curso);
        
        if(!(await repo.findOne(id))){
            return new Error("Curso não existe!");
        }

        await repo.delete(id);
    }
}