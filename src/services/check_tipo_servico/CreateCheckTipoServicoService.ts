import { isBoolean } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CheckTipoServico } from "../../entities/CheckTipoServico";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TiposServicos } from "../../entities/TiposServicos";

type CheckTipoServicoRequest = {
    tipo_componente_id: string;
    tipo_servico_id: string;
    check_servico: string;
    descricao: string;
    ativo: boolean;
};

export class CreateCheckTipoServicoService {
    async execute({
        tipo_componente_id,
        tipo_servico_id,
        check_servico,
        descricao,
        ativo,
    }: CheckTipoServicoRequest) {
        if (!validate(tipo_componente_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (!validate(tipo_servico_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (!check_servico) {
            return new Error("Insira um check de serviço");
        }

        if (!isBoolean(ativo)) {
            return new Error("Marcação para 'ativo' inválida");
        }

        const repoTipoComponente = getRepository(TiposComponentes);
        const tipoComponente = await repoTipoComponente.findOne(
            tipo_componente_id
        );
        if (!tipoComponente) {
            return new Error("Tipo de componente não existe!");
        }

        const repoTipoServico = getRepository(TiposServicos);
        const tipoServico = await repoTipoServico.findOne(tipo_servico_id);
        if (!tipoServico) {
            return new Error("Tipo de serviço não existe!");
        }

        const repo = getRepository(CheckTipoServico);
        const checkTipoServico = repo.create({
            tipo_componente_id,
            tipo_servico_id,
            check_servico,
            descricao,
            ativo,
        });

        await repo.save(checkTipoServico);

        return checkTipoServico;
    }
}
