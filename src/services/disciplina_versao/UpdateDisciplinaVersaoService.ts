import { isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Instituicao } from "../../entities/Instituicao";
import { CreateBibliografiaService } from "../bibliografia/CreateBibliografiaService";

type Bibliografia = {
    obra_id: string;
    tipo: string;
};

type DisciplinaVersaoUpdateRequest = {
    id: string;
    disciplina_id: string;
    codigo: string;
    credito_quantidade: number;
    ementa: string;
    observacao: string;
    em_oferta: boolean;
    produzido: boolean;
    instituicao_id: string;
    bibliografias?: Bibliografia[];
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
        instituicao_id,
        bibliografias,
    }: DisciplinaVersaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (disciplina_id && !validate(disciplina_id)) {
            return new Error("ID de disciplina inválido");
        }

        if (instituicao_id && !validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
            }
        }

        if (
            credito_quantidade &&
            (!isInt(credito_quantidade) || isNegative(credito_quantidade))
        ) {
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
        if (em_oferta != undefined && em_oferta != null) {
            disciplinaVersao.em_oferta = em_oferta;
        }
        if (produzido != undefined && produzido != null) {
            disciplinaVersao.produzido = produzido;
        }
        disciplinaVersao.instituicao_id = instituicao_id
            ? instituicao_id
            : disciplinaVersao.instituicao_id;

        await repo.save(disciplinaVersao);

        if (bibliografias.length) {
            for await (const bibliografia of bibliografias) {
                const service = new CreateBibliografiaService();

                const result = await service.execute({
                    obra_id: bibliografia.obra_id,
                    disciplina_versao_id: disciplinaVersao.id,
                    tipo: bibliografia.tipo,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        return {
            ...disciplinaVersao,
            disciplina,
            bibliografias,
        };
    }
}
