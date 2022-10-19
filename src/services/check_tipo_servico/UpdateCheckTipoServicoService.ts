import { isBoolean } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CheckTipoServico } from "../../entities/CheckTipoServico";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TiposServicos } from "../../entities/TiposServicos";

type CheckTipoServicoUpdateRequest = {
    id: string;
    tipo_componente_id: string;
    tipo_servico_id: string;
    check_servico: string;
    descricao: string;
    ativo: boolean;
};

export class UpdateCheckTipoComponenteService {
    async execute({
        id,
        tipo_componente_id,
        tipo_servico_id,
        check_servico,
        descricao,
        ativo,
    }: CheckTipoServicoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(CheckTipoServico);
        const checkTipoServico = await repo.findOne(id);
        if (!checkTipoServico) {
            return new Error("Check de tipo de serviço não existe!");
        }

        if (tipo_componente_id && !validate(tipo_componente_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (tipo_servico_id && !validate(tipo_servico_id)) {
            return new Error("ID de tipo de serviço inválido");
        }

        if (ativo && !isBoolean(ativo)) {
            return new Error("Marcação para 'ativo' inválida");
        }

        if (tipo_servico_id) {
            const repoTipoServico = getRepository(TiposServicos);
            const tipoServico = await repoTipoServico.findOne(tipo_servico_id);
            if (!tipoServico) {
                return new Error("Tipo de serviço não existe!");
            }
        }

        if (tipo_componente_id) {
            const repoTipoComponente = getRepository(TiposComponentes);
            const tipoComponente = await repoTipoComponente.findOne(
                tipo_componente_id
            );
            if (!tipoComponente) {
                return new Error("Tipo de componente não existe!");
            }
        }

        checkTipoServico.tipo_componente_id = tipo_componente_id
            ? tipo_componente_id
            : checkTipoServico.tipo_componente_id;
        checkTipoServico.tipo_servico_id = tipo_servico_id
            ? tipo_servico_id
            : checkTipoServico.tipo_servico_id;
        checkTipoServico.check_servico = check_servico
            ? check_servico
            : checkTipoServico.check_servico;
        checkTipoServico.descricao = descricao
            ? descricao
            : checkTipoServico.descricao;
        if (ativo != undefined && ativo != null) {
            checkTipoServico.ativo = ativo;
        }

        await repo.save(checkTipoServico);

        return checkTipoServico;
    }
}
