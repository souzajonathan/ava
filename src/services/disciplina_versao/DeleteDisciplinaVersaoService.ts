import { getRepository } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class DeleteDisciplinaVersaoService {
    async execute(id: string) {
        const repo = getRepository(DisciplinaVersao);
        
        if(!(await repo.findOne(id))){
            return new Error("Versão de Disciplina não existente!");
        }

        await repo.delete(id);
    }
}