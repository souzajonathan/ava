import { getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";

export class DeleteDisciplinaService {
    async execute(id: string) {
        const repo = getRepository(Disciplina);
        
        if(!(await repo.findOne(id))){
            return new Error("Disciplina não existe!");
        }

        await repo.delete(id);
    }
}