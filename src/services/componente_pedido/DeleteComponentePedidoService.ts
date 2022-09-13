import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesPedido } from "../../entities/ComponentesPedido";

export class DeleteComponentePedidoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesPedido);
        const componente = await repo.findOne(id, {
            relations: ["versao"],
        });

        if (!componente) {
            return new Error("Versão de Disciplina não existente!");
        }

        if (componente.versoes.length > 0) {
            return new Error("Componente com versões cadastradas");
        }

        await repo.delete(id);
    }
}
