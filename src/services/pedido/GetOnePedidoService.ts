import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Pedido } from "../../entities/Pedido";

export class GetOnePedidoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Pedido);

        const pedido = await repo.findOne(id, {
            relations: ["versaoDisciplina", "tipoSolicitacao", "componentes"],
        });

        if (!pedido) {
            return new Error("Pedido não existe!");
        }

        return pedido;
    }
}
