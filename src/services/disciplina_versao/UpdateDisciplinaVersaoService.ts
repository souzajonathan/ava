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
    async execute({
        id,
        disciplina_id,
        codigo,
        credito_quantidade,
        ementa,
        observacao,
        em_oferta,
        produzido,
    }: DisciplinaVersaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (disciplina_id && !validate(disciplina_id)) {
            return new Error("ID de disciplina inválido");
        }

        if (credito_quantidade && !Number.isInteger(credito_quantidade)) {
            return new Error(
                "Insira um número válido em quantidade de crédito"
            );
        }

        if (em_oferta && typeof em_oferta != "boolean") {
            return new Error("Marcação para 'em oferta' inválida");
        }

        if (produzido && typeof produzido != "boolean") {
            return new Error("Marcação para 'produzido' inválida");
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

        disciplinaVersao.disciplina_id = disciplina_id
            ? disciplina_id
            : disciplinaVersao.disciplina_id;
        disciplinaVersao.codigo = codigo ? codigo : disciplinaVersao.codigo;
        disciplinaVersao.credito_quantidade = credito_quantidade
            ? credito_quantidade
            : disciplinaVersao.credito_quantidade;
        disciplinaVersao.ementa = ementa ? ementa : disciplinaVersao.ementa;
        disciplinaVersao.observacao = observacao
            ? observacao
            : disciplinaVersao.observacao;
        disciplinaVersao.em_oferta = em_oferta
            ? em_oferta
            : disciplinaVersao.em_oferta;
        disciplinaVersao.produzido = produzido
            ? produzido
            : disciplinaVersao.produzido;

        await repo.save(disciplinaVersao);

        return {
            ...disciplinaVersao,
            disciplina,
        };
    }
}
