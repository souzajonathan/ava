import { isInt, isNegative } from "class-validator";
import { FindConditions, getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Instituicao } from "../../entities/Instituicao";
import { CreateBibliografiaService } from "../bibliografia/CreateBibliografiaService";

type Bibliografia = {
    obra_id: string;
    tipo: string;
};

type DisciplinaVersaoRequest = {
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

export class CreateDisciplinaVersaoService {
    async execute({
        disciplina_id,
        codigo,
        credito_quantidade,
        ementa,
        observacao,
        em_oferta,
        produzido,
        instituicao_id,
        bibliografias,
    }: DisciplinaVersaoRequest) {
        if (!disciplina_id) {
            return new Error("ID de disciplina é obrigatório");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!codigo) {
            return new Error("Código de versão de disciplina é obrigatório");
        }

        if (!ementa) {
            return new Error("Ementa é obrigatório");
        }

        if (!isInt(credito_quantidade) || isNegative(credito_quantidade)) {
            return new Error(
                "Insira um número válido em quantidade de crédito"
            );
        }

        if (typeof em_oferta != "boolean") {
            return new Error("Marcação para 'em oferta' inválida");
        }

        if (typeof produzido != "boolean") {
            return new Error("Marcação para 'produzido' inválida");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        if (!validate(disciplina_id)) {
            return new Error("ID de disciplina inválido");
        }
        const repoDisciplina = getRepository(Disciplina);
        const disciplina = await repoDisciplina.findOne(disciplina_id);
        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        const repo = getRepository(DisciplinaVersao);
        const where: FindConditions<DisciplinaVersao> = {};
        where.disciplina_id = disciplina_id;
        const numeroVersao = await repo.count({ where });

        const disciplina_versao_nome = `${
            disciplina.sigla
        }${credito_quantidade}-${numeroVersao + 1}`;

        const disciplinaVersao = repo.create({
            disciplina_id,
            disciplina_versao_nome,
            codigo,
            credito_quantidade,
            ementa,
            observacao,
            em_oferta,
            produzido,
            instituicao_id,
        });

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
