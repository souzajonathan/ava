import { isBoolean } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CheckTipoServico } from "../../entities/CheckTipoServico";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";
import { ListaChecks } from "../../entities/ListaChecks";
import { ProfissionalServico } from "../../entities/ProfissionalServico";

type ListaChecksRequest = {
    id: string;
    check_id: string;
    profissional_servico_id: string;
    versao_componente_pedido_id: string;
    check: boolean;
    observacao: string;
};

export class UpdateListaChecksService {
    async execute({
        id,
        check_id,
        profissional_servico_id,
        versao_componente_pedido_id,
        check,
        observacao,
    }: ListaChecksRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ListaChecks);
        const listaChecks = await repo.findOne(id);
        if (!listaChecks) {
            return new Error("Lista de checks de tipo de serviço não existe!");
        }

        if (check_id && !validate(check_id)) {
            return new Error("ID de check de tipo de serviço inválido");
        }

        if (profissional_servico_id && !validate(profissional_servico_id)) {
            return new Error("ID de profissional num serviço inválido");
        }

        if (
            versao_componente_pedido_id &&
            !validate(versao_componente_pedido_id)
        ) {
            return new Error("ID de versão de componente de pedido inválido");
        }

        if (check && !isBoolean(check)) {
            return new Error("Marcação para 'check' inválida");
        }

        if (check_id) {
            const repoCheck = getRepository(CheckTipoServico);
            const check = await repoCheck.findOne(check_id);
            if (!check) {
                return new Error("Check de tipo de serviço não existe!");
            }
        }

        if (profissional_servico_id) {
            const repoProfissionalServico = getRepository(ProfissionalServico);
            const profissionalServico = await repoProfissionalServico.findOne(
                profissional_servico_id
            );
            if (!profissionalServico) {
                return new Error("Profissional num serviço não existe!");
            }
        }

        if (versao_componente_pedido_id) {
            const repoVersaoComponente = getRepository(ComponentesPedidoVersao);
            const versaoComponente = await repoVersaoComponente.findOne(
                versao_componente_pedido_id
            );
            if (!versaoComponente) {
                return new Error("Versão de componente de pedido não existe!");
            }
        }

        listaChecks.check_id = check_id ? check_id : listaChecks.check_id;
        listaChecks.profissional_servico_id = profissional_servico_id
            ? profissional_servico_id
            : listaChecks.profissional_servico_id;
        listaChecks.versao_componente_pedido_id = versao_componente_pedido_id
            ? versao_componente_pedido_id
            : listaChecks.versao_componente_pedido_id;
        listaChecks.observacao = observacao
            ? observacao
            : listaChecks.observacao;
        if (check != undefined && check != null) {
            listaChecks.check = check;
        }

        await repo.save(listaChecks);

        return listaChecks;
    }
}
