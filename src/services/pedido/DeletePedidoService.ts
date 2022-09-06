import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Pedido } from "../../entities/Pedido";

export class DeletePedidoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Pedido);
        const pedido = await repo.findOne(id, {
            relations: ["componentes"],
        });

        if (!pedido) {
            return new Error("Pedido não existente!");
        }

        if (pedido.componentes.length > 0) {
            return new Error("Pedido com componentes cadastrados");
        }

        await repo.delete(id);
    }
}
