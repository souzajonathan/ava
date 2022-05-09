import { getRepository } from "typeorm";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class DeletePpcDisciplinaVersaoService {
    async execute(id: string) {
        const repo = getRepository(PpcDisciplinaVersao);
        
        if(!(await repo.findOne(id))){
            return new Error("Ppc_Disciplina_Versão não existente!");
        }

        await repo.delete(id);
    }
}