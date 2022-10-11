import { isPositive } from "class-validator";
import { FindConditions, getRepository } from "typeorm";
import { ServicosTrilhaServicos } from "../../entities/ServicosTrilhaServicos";

export class GetAllServicosTrilhaServicosService {
    async execute(position?: number) {
        const repo = getRepository(ServicosTrilhaServicos);

        const where: FindConditions<ServicosTrilhaServicos> = {};

        if (position && isPositive(position)) {
            where.posicao = position;
        }

        const servicos = await repo.find({
            relations: ["tipoServico", "trilhaServicos"],
            where,
        });

        return servicos;
    }
}
