import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";

export class GetOneComponentePedidoVersaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesPedidoVersao);

        const versaoComponente = await repo.findOne(id, {
            relations: [
                "componenteChildren",
                "componenteParent",
                "componente",
                "tipoSolicitacao",
            ],
        });

        if (!versaoComponente) {
            return new Error("Versão de Componente de Pedido não existe!");
        }

        return versaoComponente;
    }
}
