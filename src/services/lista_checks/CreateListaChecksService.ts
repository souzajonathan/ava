import { isBoolean } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CheckTipoServico } from "../../entities/CheckTipoServico";
import { ComponentesPedidoVersao } from "../../entities/ComponentePedidoVersao";
import { ListaChecks } from "../../entities/ListaChecks";
import { ProfissionalServico } from "../../entities/ProfissionalServico";

type ListaChecksRequest = {
    check_id: string;
    profissional_servico_id: string;
    versao_componente_pedido_id: string;
    check: boolean;
    observacao: string;
};

export class CreateListaChecksService {
    async execute({
        check_id,
        profissional_servico_id,
        versao_componente_pedido_id,
        check,
        observacao,
    }: ListaChecksRequest) {
        if (!validate(check_id)) {
            return new Error("ID de check de tipo de serviço inválido");
        }

        if (!validate(profissional_servico_id)) {
            return new Error("ID de profissional num serviço inválido");
        }

        if (!validate(versao_componente_pedido_id)) {
            return new Error("ID de versão de componente de pedido inválido");
        }

        if (!isBoolean(check)) {
            return new Error("Marcação para 'check' inválida");
        }

        const repoCheck = getRepository(CheckTipoServico);
        const checkTipoComponente = await repoCheck.findOne(check_id);
        if (!checkTipoComponente) {
            return new Error("Check de tipo de componente não existe!");
        }

        const repoProfissionalServico = getRepository(ProfissionalServico);
        const profissionalServico = await repoProfissionalServico.findOne(
            profissional_servico_id
        );
        if (!profissionalServico) {
            return new Error("Profissional num serviço não existe!");
        }

        const repoVersaoComponente = getRepository(ComponentesPedidoVersao);
        const versaoComponente = await repoVersaoComponente.findOne(
            profissional_servico_id
        );
        if (!versaoComponente) {
            return new Error("Versão de componente de pedido não existe!");
        }

        const repo = getRepository(ListaChecks);
        const listaChecks = repo.create({
            check_id,
            profissional_servico_id,
            versao_componente_pedido_id,
            check,
            observacao,
        });

        await repo.save(listaChecks);

        return listaChecks;
    }
}
