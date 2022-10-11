import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TrilhaServicos } from "../../entities/TrilhaServicos";

type TrilhaServicosRequest = {
    nome_trilha: string;
    componente_tipo_id: string;
};

export class CreateTrilhaServicosService {
    async execute({ nome_trilha, componente_tipo_id }: TrilhaServicosRequest) {
        if (!validate(componente_tipo_id)) {
            return new Error("ID de tipo de componente inválido");
        }
        if (!nome_trilha) {
            return new Error("Nome de trilha não inserido");
        }

        const repo = getRepository(TrilhaServicos);
        const trilhaAlreadyExists = await repo.findOne({ nome_trilha });
        if (trilhaAlreadyExists) {
            return new Error("Nome de trilha já existe");
        }

        const repoTipoComponente = getRepository(TiposComponentes);
        const tipoComponente = await repoTipoComponente.findOne(
            componente_tipo_id
        );
        if (!tipoComponente) {
            return new Error("Tipo de componente não existe!");
        }

        const tipoSolicitacao = repo.create({
            nome_trilha,
            componente_tipo_id,
        });

        await repo.save(tipoSolicitacao);

        return tipoSolicitacao;
    }
}
