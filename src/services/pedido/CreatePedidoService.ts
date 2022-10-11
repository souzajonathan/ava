import { getRepository } from "typeorm";
import { validate } from "uuid";
import { isBoolean, isDate, isDateString } from "class-validator";
import { Pedido } from "../../entities/Pedido";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type PedidoRequest = {
    disciplina_versao_id: string;
    tipo_solicitacao_id: string;
    data_entrega: Date;
    analisado: boolean;
    aprovacao_interna: boolean;
    aprovacao_externa: boolean;
    concluido: boolean;
    observacoes: string;
    solicitante_id: string;
    responsavel_id: string;
};

export class CreatePedidoService {
    async execute({
        disciplina_versao_id,
        tipo_solicitacao_id,
        data_entrega,
        analisado,
        aprovacao_interna,
        aprovacao_externa,
        concluido,
        observacoes,
        solicitante_id,
        responsavel_id,
    }: PedidoRequest) {
        if (!validate(disciplina_versao_id)) {
            return new Error("ID de disciplina inválido");
        }

        if (tipo_solicitacao_id && !validate(tipo_solicitacao_id)) {
            return new Error("ID de tipo de solicitação é obrigatório");
        }

        if (data_entrega && !isDate(data_entrega)) {
            return new Error("Data de entrega inválida");
        }

        if (analisado && !isBoolean(analisado)) {
            return new Error("Marcação para 'analisado' inválida");
        }

        if (aprovacao_interna && !isBoolean(aprovacao_interna)) {
            return new Error("Marcação para 'aprovação interna' inválida");
        }

        if (aprovacao_externa && !isBoolean(aprovacao_externa)) {
            return new Error("Marcação para 'aprovação externa' inválida");
        }

        if (concluido && !isBoolean(concluido)) {
            return new Error("Marcação para 'concluído' inválida");
        }

        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(
            disciplina_versao_id
        );
        if (!disciplinaVersao) {
            return new Error("Versão de Disciplina não existe!");
        }

        if (tipo_solicitacao_id) {
            const repoTipoSolicitacao = getRepository(TiposSolicitacao);
            const tipo = await repoTipoSolicitacao.findOne(tipo_solicitacao_id);
            if (!tipo) {
                return new Error("Tipo de solicitação não existe!");
            }
        }

        const repo = getRepository(Pedido);

        const pedido = repo.create({
            disciplina_versao_id,
            tipo_solicitacao_id,
            data_entrega,
            analisado,
            aprovacao_interna,
            aprovacao_externa,
            concluido,
            observacoes,
            solicitante_id,
            responsavel_id,
        });

        await repo.save(pedido);

        return {
            ...pedido,
            disciplinaVersao,
        };
    }
}
