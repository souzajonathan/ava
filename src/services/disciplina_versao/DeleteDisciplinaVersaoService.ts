import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Bibliografia } from "../../entities/Bibliografia";
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

        const repoBibliografia = getRepository(Bibliografia);
        const versaoWithBibliografias = await repoBibliografia.findOne({where: {versao_disciplina_id : id}});

        if(versaoWithBibliografias){
            return new Error("Versão de disciplina com bibliografias cadastradas");
        }

        await repo.delete(id);
    }
}