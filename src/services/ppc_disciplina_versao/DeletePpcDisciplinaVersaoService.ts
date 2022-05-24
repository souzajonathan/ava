import { getRepository } from "typeorm";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

export class DeletePpcDisciplinaVersaoService {
    async execute(id: string) {
        const repo = getRepository(PpcDisciplinaVersao);
        const ppcDisciplinaVersao = await repo.findOne(id, {
            relations: ["competencias", "perfis"]
        });

        if(!(ppcDisciplinaVersao)){
            return new Error("Ppc_Disciplina_Versão não existente!");
        }

        if(ppcDisciplinaVersao.competencias.length > 0){
            return new Error("Ppc Disciplina Versão com competências não podem ser deletados!");
        }

        if(ppcDisciplinaVersao.perfis.length > 0){
            return new Error("Ppc Disciplina Versão com perfis não podem ser deletados!");
        }

        await repo.delete(id);
    }
}