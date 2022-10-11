import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";
import { Servico } from "../../entities/Servico";
import { TiposServicos } from "../../entities/TiposServicos";

type ServicoUpdateRequest = {
    id: string;
    componente_pedido_versao_id: string;
    tipo_servico_id: string;
    observacao: string;
    posicao: number;
    em_andamento: boolean;
    aprovacao: boolean;
};

export class UpdateServicoService {
    async execute({
        id,
        componente_pedido_versao_id,
        tipo_servico_id,
        observacao,
        posicao,
        em_andamento,
        aprovacao,
    }: ServicoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Servico);
        const servico = await repo.findOne(id);
        if (!servico) {
            return new Error("Serviço não existe!");
        }

        if (
            componente_pedido_versao_id &&
            !validate(componente_pedido_versao_id)
        ) {
            return new Error("ID de versão de componente de pedido inválido");
        }

        if (tipo_servico_id && !validate(tipo_servico_id)) {
            return new Error("ID de tipo de serviço inválido");
        }

        if (posicao && !Number.isInteger(posicao)) {
            return new Error("Insira um valor válido");
        }

        if (em_andamento && typeof em_andamento != "boolean") {
            return new Error("Marcação para 'em andamento' inválida");
        }

        if (aprovacao && typeof aprovacao != "boolean") {
            return new Error("Marcação para 'aprovação' inválida");
        }

        if (componente_pedido_versao_id) {
            const repoComponentePedidoVersao = getRepository(
                ComponentesPedidoVersao
            );
            const versao = await repoComponentePedidoVersao.findOne(
                componente_pedido_versao_id
            );
            if (!versao) {
                return new Error("Versão de componente de pedido não existe!");
            }
        }

        if (tipo_servico_id) {
            const repoTipoServico = getRepository(TiposServicos);
            const tipoServico = await repoTipoServico.findOne(tipo_servico_id);
            if (!tipoServico) {
                return new Error("Tipo de serviço não existe!");
            }
        }

        servico.componente_pedido_versao_id = componente_pedido_versao_id
            ? componente_pedido_versao_id
            : servico.componente_pedido_versao_id;
        servico.tipo_servico_id = tipo_servico_id
            ? tipo_servico_id
            : servico.tipo_servico_id;
        servico.observacao = observacao ? observacao : servico.observacao;
        servico.posicao = posicao ? posicao : servico.posicao;
        if (em_andamento != undefined && em_andamento != null) {
            servico.em_andamento = em_andamento;
        }
        if (aprovacao != undefined && aprovacao != null) {
            servico.aprovacao = aprovacao;
        }

        await repo.save(servico);

        return servico;
    }
}
