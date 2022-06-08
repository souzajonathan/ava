import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type DisciplinaVersaoUpdateRequest = {
    id: string;
    disciplina_id: string;
    codigo: string;
    credito_quantidade: number;
    ementa: string;
    observacao: string;
    em_oferta: boolean;
    produzido: boolean;
};

export class UpdateDisciplinaVersaoService {
    async execute ({
        id,
        disciplina_id,
        codigo,
        credito_quantidade,
        ementa,
        observacao,
        em_oferta,
        produzido
    }: DisciplinaVersaoUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        if(disciplina_id){
            if(validate(disciplina_id)){
                return new Error("ID de disciplina inválido");
            }
        }
        
        const repo = getRepository(DisciplinaVersao);
        const disciplinaVersao = await repo.findOne(id);
        if (!disciplinaVersao) {
            return new Error("Versão de disciplina não existe!");
        }

        const repoDisciplina = getRepository(Disciplina);
        const disciplina = await repoDisciplina.findOne(disciplina_id);
        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        disciplinaVersao.disciplina_id = disciplina_id ? disciplina_id : disciplinaVersao.disciplina_id;
        disciplinaVersao.codigo = codigo ? codigo : disciplinaVersao.codigo;
        disciplinaVersao.credito_quantidade = credito_quantidade ? credito_quantidade : disciplinaVersao.credito_quantidade;
        disciplinaVersao.ementa = ementa ? ementa : disciplinaVersao.ementa;
        disciplinaVersao.observacao = observacao ? observacao : disciplinaVersao.observacao;
        disciplinaVersao.em_oferta = em_oferta ? em_oferta : disciplinaVersao.em_oferta;
        disciplinaVersao.produzido = produzido ? produzido : disciplinaVersao.produzido;

        await repo.save(disciplinaVersao);

        return {
            ...disciplinaVersao, disciplina
        };
    }
}