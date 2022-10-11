import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Servico } from "../../entities/Servico";

export class GetOneServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Servico);

        const servico = await repo.findOne(id, {
            relations: ["componentePedidoVersao", "tipoServico"],
        });

        if (!servico) {
            return new Error("Serviço não existe!");
        }

        return servico;
    }
}
