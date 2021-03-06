import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Bibliografia } from "../../entities/Bibliografia";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Obra } from "../../entities/Obra";

type BibliografiaRequest = {
    disciplina_versao_id: string;
    obra_id: string;
    tipo: string;
}

export class CreateBibliografiaService {
    async execute ({disciplina_versao_id, obra_id, tipo}: BibliografiaRequest) {
        if(!validate(disciplina_versao_id)){
            return new Error("ID de versão de disciplina inválido");
        }

        if(!validate(obra_id)){
            return new Error("ID de obra inválido");
        }
        
        if(!tipo){
            return new Error("Tipo não inserido");
        }

        const repo = getRepository(Bibliografia);

        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);
        if(!disciplinaVersao) {
            return new Error("Versão de disciplina não existe!");
        }

        const repoObra = getRepository(Obra);
        const obra = await repoObra.findOne(obra_id);
        if(!obra) {
            return new Error("Obra não existe!");
        }

        const bibliografia = repo.create({disciplina_versao_id, obra_id, tipo});

        await repo.save(bibliografia);

        return {
            ...bibliografia, disciplinaVersao, obra
        };
    }
}