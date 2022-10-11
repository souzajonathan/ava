import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

export class DeleteServicoTrilhaServicosService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TrilhaServicos);
        const servicoTrilhaServicos = await repo.findOne(id);
        if (!servicoTrilhaServicos) {
            return new Error("Serviço não existe na trilha de serviços!");
        }

        await repo.delete(id);
    }
}
