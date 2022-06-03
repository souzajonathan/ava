import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";

export class DeleteDisciplinaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Disciplina);
        const disciplina = await repo.findOne(id, {
            relations: ["versoes"]
        });
        
        if(!disciplina){
            return new Error("Disciplina não existe!");
        }

        if(disciplina.versoes.length > 0){
            return new Error("Disciplina com versões cadastradas");
        }

        await repo.delete(id);
    }
}