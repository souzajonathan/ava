import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Servico } from "../../entities/Servico";

type ServicoRequest = {
    componente_pedido_versao_id: string;
    tipo_servico_id: string;
    observacao: string;
    posicao: number;
    em_andamento: boolean;
    aprovacao: boolean;
};

export class CreateServicoService {
    async execute({
        componente_pedido_versao_id,
        tipo_servico_id,
        observacao,
        posicao,
        em_andamento,
        aprovacao,
    }: ServicoRequest) {
        if (!validate(componente_pedido_versao_id)) {
            return new Error("ID de versão de componente de pedido inválido");
        }

        if (!validate(tipo_servico_id)) {
            return new Error("ID de tipo de serviço inválido");
        }

        if (!Number.isInteger(posicao)) {
            return new Error("Insira um valor válido em posição");
        }

        if (typeof em_andamento != "boolean") {
            return new Error("Marcação para 'em andamento' inválida");
        }

        if (typeof aprovacao != "boolean") {
            return new Error("Marcação para 'aprovação' inválida");
        }

        const repo = getRepository(Servico);

        const servico = repo.create({
            componente_pedido_versao_id,
            tipo_servico_id,
            observacao,
            posicao,
            em_andamento,
            aprovacao,
        });

        await repo.save(servico);

        return servico;
    }
}
