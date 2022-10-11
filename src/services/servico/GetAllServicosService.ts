import { FindConditions, getRepository } from "typeorm";
import { Servico } from "../../entities/Servico";

export class GetAllServicosService {
    async execute(
        posicao?: number,
        em_andamento?: boolean,
        aprovacao?: boolean
    ) {
        const repo = getRepository(Servico);

        const where: FindConditions<Servico> = {};

        if (posicao) {
            where.posicao = posicao;
        }

        if (em_andamento) {
            where.em_andamento = em_andamento;
        }

        if (aprovacao) {
            where.aprovacao = aprovacao;
        }

        const servicos = await repo.find({
            relations: ["componentePedidoVersao", "tipoServico"],
            where,
        });

        return servicos;
    }
}
