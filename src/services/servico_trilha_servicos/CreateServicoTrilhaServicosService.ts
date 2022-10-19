import { isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ServicosTrilhaServicos } from "../../entities/ServicosTrilhaServicos";
import { TiposServicos } from "../../entities/TiposServicos";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

type ServicoTrilhaServicosRequest = {
    tipo_servico_id: string;
    trilha_servicos_id: string;
    posicao: number;
};

export class CreateServicoTrilhaServicosService {
    async execute({
        tipo_servico_id,
        trilha_servicos_id,
        posicao,
    }: ServicoTrilhaServicosRequest) {
        if (!validate(tipo_servico_id)) {
            return new Error("ID de tipo de serviço inválido");
        }

        if (!validate(trilha_servicos_id)) {
            return new Error("ID de trilha de serviços inválido");
        }

        if (!posicao || !isInt(posicao) || isNegative(posicao)) {
            return new Error("Insira um número de posição válido");
        }

        const repo = getRepository(ServicosTrilhaServicos);
        const posicaoAlreadyExists = await repo.findOne({ posicao });
        if (posicaoAlreadyExists) {
            return new Error("Posição já existe");
        }

        const repoTipoServico = getRepository(TiposServicos);
        const tipoServico = await repoTipoServico.findOne(tipo_servico_id);
        if (!tipoServico) {
            return new Error("Tipo de serviço não existe!");
        }

        const repoTrilhaServicos = getRepository(TrilhaServicos);
        const trilhaServicos = await repoTrilhaServicos.findOne(
            trilha_servicos_id
        );
        if (!trilhaServicos) {
            return new Error("Trilha de serviços não existe!");
        }

        const servicoTrilhaServicos = repo.create({
            tipo_servico_id,
            trilha_servicos_id,
            posicao,
        });

        await repo.save(servicoTrilhaServicos);

        return servicoTrilhaServicos;
    }
}
