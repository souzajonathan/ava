import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";

export class DeleteComponentePedidoVersaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesPedidoVersao);
        const versaoComponente = await repo.findOne(id, {
            relations: ["servicos"],
        });

        if (!versaoComponente) {
            return new Error("Versão de componente de pedido não existente!");
        }

        if (versaoComponente.servicos.length > 0) {
            return new Error("Versão de Componente com serviços cadastrados");
        }

        await repo.delete(id);
    }
}
