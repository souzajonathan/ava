import { getRepository } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class DeleteDisciplinaVersaoService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(DisciplinaVersao);
        const versao = await repo.findOne(id);
        
        if(!versao){
            return new Error("Versão de Disciplina não existente!");
        }

        await repo.delete(id);
    }
}