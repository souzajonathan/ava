import { getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

type DisciplinaVersaoUpdateRequest = {
    id: string;
    disciplina_id: string;
    disciplina_versao_nome: string;
    codigo: string;
    credito_quantidade: number;
    ementa: string;
    bibliografia_basica: string;
    comp_bibliografia: string;
    observacao: string;
    em_oferta: number;
    produzido: number;
};

export class UpdateDisciplinaVersaoService {
    async execute ({
        id,
        disciplina_id,
        disciplina_versao_nome,
        codigo,
        credito_quantidade,
        ementa,
        bibliografia_basica,
        comp_bibliografia,
        observacao,
        em_oferta,
        produzido
    }: DisciplinaVersaoUpdateRequest) {
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
        disciplinaVersao.bibliografia_basica = bibliografia_basica ? bibliografia_basica : disciplinaVersao.bibliografia_basica;
        disciplinaVersao.comp_bibliografia = comp_bibliografia ? comp_bibliografia : disciplinaVersao.comp_bibliografia;
        disciplinaVersao.observacao = observacao ? observacao : disciplinaVersao.observacao;
        disciplinaVersao.em_oferta = em_oferta ? em_oferta : disciplinaVersao.em_oferta;
        disciplinaVersao.produzido = produzido ? produzido : disciplinaVersao.produzido;

        await repo.save(disciplinaVersao);

        return {
            ...disciplinaVersao, disciplina
        };
    }
}