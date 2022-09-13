import { getRepository } from "typeorm";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type TipoSolicitacaoRequest = {
    tipo: string;
};

export class CreateTipoSolicitacaoService {
    async execute({ tipo }: TipoSolicitacaoRequest) {
        if (!tipo) {
            return new Error("Tipo de solicitação não inserido");
        }

        const repo = getRepository(TiposSolicitacao);
        const tipoAlreadyExists = await repo.findOne({ tipo });

        if (tipoAlreadyExists) {
            return new Error("Tipo já existe");
        }

        const tipoSolicitacao = repo.create({
            tipo,
        });

        await repo.save(tipoSolicitacao);

        return tipoSolicitacao;
    }
}
