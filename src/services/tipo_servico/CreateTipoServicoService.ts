import { getRepository } from "typeorm";
import { TiposServicos } from "../../entities/TiposServicos";

type TipoServicoRequest = {
    nome: string;
    descricao: string;
    valor: number;
    unidade_medida: string;
    aprovacao: boolean;
};

export class CreateTipoServicoService {
    async execute({
        nome,
        descricao,
        valor,
        unidade_medida,
        aprovacao,
    }: TipoServicoRequest) {
        if (!nome) {
            return new Error("Tipo de solicitação não inserido");
        }

        if (!Number.isInteger(valor)) {
            return new Error("Insira um valor válido");
        }

        if (!unidade_medida) {
            return new Error("Unidade de medida não inserida");
        }

        if (typeof aprovacao != "boolean") {
            return new Error("Marcação para 'aprovação' inválida");
        }

        const repo = getRepository(TiposServicos);
        const tipoAlreadyExists = await repo.findOne({ nome });
        if (tipoAlreadyExists) {
            return new Error("Tipo já existe");
        }

        const tipoServico = repo.create({
            nome,
            descricao,
            valor,
            unidade_medida,
            aprovacao,
        });

        await repo.save(tipoServico);

        return tipoServico;
    }
}
