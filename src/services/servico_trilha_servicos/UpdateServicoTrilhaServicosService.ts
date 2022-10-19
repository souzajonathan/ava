import { isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ServicosTrilhaServicos } from "../../entities/ServicosTrilhaServicos";
import { TiposServicos } from "../../entities/TiposServicos";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

type ServicoTrilhaServicosUpdateRequest = {
    id: string;
    tipo_servico_id: string;
    trilha_servicos_id: string;
    posicao: number;
};

export class UpdateServicoTrilhaServicosService {
    async execute({
        id,
        tipo_servico_id,
        trilha_servicos_id,
        posicao,
    }: ServicoTrilhaServicosUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(tipo_servico_id)) {
            return new Error("ID de tipo de serviço inválido");
        }

        if (!validate(trilha_servicos_id)) {
            return new Error("ID de trilha de serviços inválido");
        }

        if (posicao && (!isInt(posicao) || isNegative(posicao))) {
            return new Error("Insira um valor válido em posição");
        }

        const repo = getRepository(ServicosTrilhaServicos);
        const servico = await repo.findOne(id);
        if (!servico) {
            return new Error("Serviço na trilha de serviços não existe!");
        }

        if (tipo_servico_id) {
            const repoTipoServico = getRepository(TiposServicos);
            const tipoServico = await repoTipoServico.findOne(tipo_servico_id);
            if (!tipoServico) {
                return new Error("Tipo de serviço não existe!");
            }
        }

        if (trilha_servicos_id) {
            const repoTrilhaServicos = getRepository(TrilhaServicos);
            const trilhaServicos = await repoTrilhaServicos.findOne(
                trilha_servicos_id
            );
            if (!trilhaServicos) {
                return new Error("Trilha de serviços não existe!");
            }
        }

        servico.tipo_servico_id = tipo_servico_id
            ? tipo_servico_id
            : servico.tipo_servico_id;
        servico.trilha_servicos_id = trilha_servicos_id
            ? trilha_servicos_id
            : servico.trilha_servicos_id;
        servico.posicao = posicao ? posicao : servico.posicao;

        await repo.save(servico);

        return servico;
    }
}
