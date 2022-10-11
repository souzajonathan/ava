import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

type TrilhaServicosUpdateRequest = {
    id: string;
    nome_trilha: string;
    componente_tipo_id: string;
};

export class UpdateTrilhaServicosService {
    async execute({
        id,
        nome_trilha,
        componente_tipo_id,
    }: TrilhaServicosUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(componente_tipo_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        const repo = getRepository(TrilhaServicos);
        const trilha = await repo.findOne(id);
        if (!trilha) {
            return new Error("Trilha de serviços não existe!");
        }

        if (componente_tipo_id) {
            const repoTipoComponente = getRepository(TiposComponentes);
            const tipoComponente = await repoTipoComponente.findOne(
                componente_tipo_id
            );
            if (!tipoComponente) {
                return new Error("Tipo de componente não existe!");
            }
        }

        trilha.nome_trilha = nome_trilha ? nome_trilha : trilha.nome_trilha;
        trilha.componente_tipo_id = componente_tipo_id
            ? componente_tipo_id
            : trilha.componente_tipo_id;

        await repo.save(trilha);

        return trilha;
    }
}
