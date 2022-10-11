import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ServicosTrilhaServicos } from "../../entities/ServicosTrilhaServicos";

export class GetOneServicoTrilhaServicosService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ServicosTrilhaServicos);

        const servico = await repo.findOne(id, {
            relations: ["tipoServico", "trilhaServicos"],
        });

        if (!servico) {
            return new Error("Serviço não existe na trilha de serviços!");
        }

        return servico;
    }
}
