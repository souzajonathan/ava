import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposServicos } from "../../entities/TiposServicos";

type TipoServicoUpdateRequest = {
    id: string;
    nome: string;
    descricao: string;
    valor: number;
    unidade_medida: string;
    aprovacao: boolean;
};

export class UpdateTipoServicoService {
    async execute({
        id,
        nome,
        descricao,
        valor,
        unidade_medida,
        aprovacao,
    }: TipoServicoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposServicos);
        const tipoServico = await repo.findOne(id);
        if (!tipoServico) {
            return new Error("Tipo de serviço não existe!");
        }

        if (valor && !Number.isInteger(valor)) {
            return new Error("Insira um valor válido");
        }

        if (aprovacao && typeof aprovacao != "boolean") {
            return new Error("Marcação para 'aprovação' inválida");
        }

        tipoServico.nome = nome ? nome : tipoServico.nome;
        tipoServico.descricao = descricao ? descricao : tipoServico.descricao;
        tipoServico.valor = valor ? valor : tipoServico.valor;
        tipoServico.unidade_medida = unidade_medida
            ? unidade_medida
            : tipoServico.unidade_medida;
        if (aprovacao != undefined && aprovacao != null) {
            tipoServico.aprovacao = aprovacao;
        }

        await repo.save(tipoServico);

        return tipoServico;
    }
}
