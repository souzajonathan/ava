import { getRepository } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class DeleteDisciplinaVersaoService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(DisciplinaVersao);
        
        if(!(await repo.findOne(id))){
            return new Error("Versão de Disciplina não existente!");
        }

        await repo.delete(id);
    }
}