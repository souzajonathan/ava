import { FindConditions, getRepository } from "typeorm";
import { Pedido } from "../../entities/Pedido";

export class GetAllPedidosService {
    async execute(
        disciplina_versao_id?: string,
        responsavel_id?: string,
        solicitante_id?: string,
        concluido?: boolean,
        analisado?: boolean
    ) {
        const repo = getRepository(Pedido);

        const where: FindConditions<Pedido> = {};

        if (concluido) {
            where.concluido = true;
        }

        if (analisado) {
            where.analisado = true;
        }

        if (disciplina_versao_id) {
            where.disciplina_versao_id = disciplina_versao_id;
        }

        if (responsavel_id) {
            where.responsavel_id = responsavel_id;
        }

        if (solicitante_id) {
            where.solicitante_id = solicitante_id;
        }

        const pedidos = await repo.find({
            relations: ["componentes", "tipoSolicitacao", "DisciplinaVersao"],
            where,
        });

        return pedidos;
    }
}
