import { isBoolean } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Pedido } from "../../entities/Pedido";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type PedidoUpdateRequest = {
    id: string;
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

export class UpdatePedidoService {
    async execute({
        id,
        disciplina_versao_id,
        tipo_solicitacao_id,
        analisado,
        aprovacao_interna,
        aprovacao_externa,
        concluido,
        observacoes,
        solicitante_id,
        responsavel_id,
    }: PedidoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (disciplina_versao_id && !isBoolean(disciplina_versao_id)) {
            return new Error("ID de versão de disciplina inválido");
        }

        if (tipo_solicitacao_id && !isBoolean(tipo_solicitacao_id)) {
            return new Error("ID de tipo de solicitação inválido");
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

        const repo = getRepository(Pedido);
        const pedido = await repo.findOne(id);
        if (!pedido) {
            return new Error("Pedido não existe!");
        }

        const repoDisciplinaVersao = getRepository(DisciplinaVersao);
        const disciplinaVersao = await repoDisciplinaVersao.findOne(
            disciplina_versao_id
        );
        if (!disciplinaVersao) {
            return new Error("Versão de Disciplina não existe!");
        }

        const repoTipoSolicitacao = getRepository(TiposSolicitacao);
        const tipoSolicitacao = await repoTipoSolicitacao.findOne(
            tipo_solicitacao_id
        );
        if (!tipoSolicitacao) {
            return new Error("Tipo de Solicitação não existe!");
        }

        pedido.disciplina_versao_id = disciplina_versao_id
            ? disciplina_versao_id
            : pedido.disciplina_versao_id;
        pedido.tipo_solicitacao_id = tipo_solicitacao_id
            ? tipo_solicitacao_id
            : pedido.tipo_solicitacao_id;
        if (analisado != undefined && analisado != null) {
            pedido.analisado = analisado;
        }
        if (aprovacao_interna != undefined && aprovacao_interna != null) {
            pedido.aprovacao_interna = aprovacao_interna;
        }
        if (aprovacao_externa != undefined && aprovacao_externa != null) {
            pedido.aprovacao_externa = aprovacao_externa;
        }
        if (concluido != undefined && concluido != null) {
            pedido.concluido = concluido;
        }
        pedido.observacoes = observacoes ? observacoes : pedido.observacoes;
        pedido.solicitante_id = solicitante_id
            ? solicitante_id
            : pedido.solicitante_id;
        pedido.responsavel_id = responsavel_id
            ? responsavel_id
            : pedido.responsavel_id;

        await repo.save(disciplinaVersao);

        return {
            ...pedido,
            disciplinaVersao,
            tipoSolicitacao,
        };
    }
}
