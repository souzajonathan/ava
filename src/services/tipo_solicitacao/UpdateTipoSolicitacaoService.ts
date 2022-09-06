import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposSolicitacao } from "../../entities/TiposSolicitacao";

type TipoSolicitacaoUpdateRequest = {
    id: string;
    tipo: string;
};

export class UpdateTipoSolicitacaoService {
    async execute({ id, tipo }: TipoSolicitacaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposSolicitacao);
        const tipoSolicitacao = await repo.findOne(id);
        if (!tipoSolicitacao) {
            return new Error("Tipo de solicitação não existe!");
        }

        tipoSolicitacao.tipo = tipo ? tipo : tipoSolicitacao.tipo;

        await repo.save(tipoSolicitacao);

        return tipoSolicitacao;
    }
}
