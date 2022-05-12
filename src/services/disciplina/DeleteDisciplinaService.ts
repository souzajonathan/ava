import { getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class DeleteDisciplinaService {
    async execute(id: string) {
        const repo = getRepository(Disciplina);
        const repoVersoes = getRepository(DisciplinaVersao);
        
        if(!(await repo.findOne(id))){
            return new Error("Disciplina não existe!");
        }

        if(await repoVersoes.findOne({where: {disciplina_id : id}})){
            return new Error("Disciplina com versões cadastradas");
        }

        await repo.delete(id);
    }
}