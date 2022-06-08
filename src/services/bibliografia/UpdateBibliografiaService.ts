import { getRepository, In } from "typeorm";
import { validate } from "uuid";
import { Bibliografia } from "../../entities/Bibliografia";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Obra } from "../../entities/Obra";

type BibliografiaUpdateRequest = {
    id: string;
    disciplina_versao_id: string;
    obra_id: string;
    tipo: boolean;
};

export class UpdateBibliografiaService {
    async execute ({id, disciplina_versao_id, obra_id, tipo}: BibliografiaUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        if(disciplina_versao_id){
            if(!validate(disciplina_versao_id)){
                return new Error("ID de versão de disciplina inválido");
            }
        }

        if(obra_id){
            if(!validate(obra_id)){
                return new Error("ID de obra inválido");
            }
        }

        const repo = getRepository(Bibliografia);
        const bibliografia = await repo.findOne(id);
        if (!bibliografia) {
            return new Error("Bibliografia não existente");
        }

        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);
        if (!disciplinaVersao) {
            return new Error("Disciplina não existente");
        }

        const repoObra = getRepository(Obra);
        const obra = await repoObra.findOne(obra_id);
        if (!obra) {
            return new Error("Obra não existente");
        }

        bibliografia.disciplina_versao_id = disciplina_versao_id ? disciplina_versao_id : bibliografia.disciplina_versao_id;
        bibliografia.obra_id = obra_id ? obra_id : bibliografia.obra_id;
        bibliografia.tipo = tipo ? tipo : bibliografia.tipo;

        await repo.save(bibliografia);

        return {
            ...bibliografia, disciplinaVersao, obra
        };
    }
}