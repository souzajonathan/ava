import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type DisciplinaVersaoUpdateRequest = {
    id: string;
    disciplina_id: string;
    disciplina_versao_nome: string;
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
        disciplina_versao_nome,
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
        const repo = getRepository(DisciplinaVersao);
        const repoDisciplina = getRepository(Disciplina);

        const disciplinaVersao = await repo.findOne(id);
        const disciplina = await repoDisciplina.findOne(disciplina_id);

        if (!disciplinaVersao) {
            return new Error("Versão de disciplina não existe!");
        }

        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        disciplinaVersao.disciplina_id = disciplina_id ? disciplina_id : disciplinaVersao.disciplina_id;
        disciplinaVersao.disciplina_versao_nome = disciplina_versao_nome ? disciplina_versao_nome : disciplinaVersao.disciplina_versao_nome;
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