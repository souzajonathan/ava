import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class DeleteDisciplinaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Disciplina);
        const repoVersoes = getRepository(DisciplinaVersao);
        const disciplina = await repo.findOne(id);
        
        if(!disciplina){
            return new Error("Disciplina não existe!");
        }

        const disciplinaWithVersoes = await repoVersoes.findOne({where: {disciplina_id : id}});

        if(disciplinaWithVersoes){
            return new Error("Disciplina com versões cadastradas");
        }

        await repo.delete(id);
    }
}