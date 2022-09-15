import { getRepository } from "typeorm";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";

export class GetAllComponentesPedidoVersaoService {
    async execute() {
        const repo = getRepository(ComponentesPedidoVersao);

        const versoesComponentes = await repo.find({
            relations: [
                "versaoChildren",
                "versaoParent",
                "componente",
                "tipoSolicitacao",
            ],
        });

        return versoesComponentes;
    }
}
