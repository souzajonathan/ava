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
        const repo = getRepository(Bibliografia);
        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const repoObra = getRepository(Obra);

        const bibliografia = await repo.findOne(id);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(disciplina_versao_id);
        const obra = await repoObra.findOne(obra_id);


        if (!bibliografia) {
            return new Error("Bibliografia não existente!");
        }

        if (!disciplinaVersao) {
            return new Error("Disciplina não existe!");
        }

        if (!obra) {
            return new Error("Obra não existe!");
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