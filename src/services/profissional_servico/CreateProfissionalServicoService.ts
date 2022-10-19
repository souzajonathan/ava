import { getRepository } from "typeorm";
import { validate } from "uuid";
import {
    isBoolean,
    isDate,
    isInt,
    isNegative,
    isNumber,
} from "class-validator";
import { ProfissionalServico } from "../../entities/ProfissionalServico";
import { Profissional } from "../../entities/Profissional";
import { Servico } from "../../entities/Servico";

type ProfissionalServicoRequest = {
    servico_id: string;
    profissional_id: string;
    data_prazo: Date;
    data_entrega: Date;
    convite: boolean;
    aceite: boolean;
    contrato: number;
    entrega: boolean;
    check: boolean;
    ajuste: number;
    aprovacao_servico: boolean;
    fechado: boolean;
    pagamento: boolean;
    valor_orcado: number;
    valor_pago: number;
    observacao: string;
};

export class CreateProfissionalServicoService {
    async execute({
        servico_id,
        profissional_id,
        data_prazo,
        data_entrega,
        convite,
        aceite,
        contrato,
        entrega,
        check,
        ajuste,
        aprovacao_servico,
        fechado,
        pagamento,
        valor_orcado,
        valor_pago,
        observacao,
    }: ProfissionalServicoRequest) {
        if (!validate(servico_id)) {
            return new Error("ID de serviço inválido");
        }

        if (!validate(profissional_id)) {
            return new Error("ID de profissional inválido");
        }

        if (data_prazo && !isDate(data_prazo)) {
            return new Error("Data prazo inválida");
        }

        if (data_entrega && !isDate(data_entrega)) {
            return new Error("Data entrega inválida");
        }

        if (convite && !isBoolean(convite)) {
            return new Error("Marcação para 'convite' inválida");
        }

        if (aceite && !isBoolean(aceite)) {
            return new Error("Marcação para 'aceite' inválida");
        }

        if (contrato && (!isInt(contrato) || isNegative(contrato))) {
            return new Error("Insira um valor válido em contrato");
        }

        if (entrega && !isBoolean(entrega)) {
            return new Error("Marcação para 'entrega' inválida");
        }

        if (check && !isBoolean(check)) {
            return new Error("Marcação para 'check' inválida");
        }

        if (ajuste && (!isInt(ajuste) || isNegative(ajuste))) {
            return new Error("Insira um valor válido em ajuste");
        }

        if (aprovacao_servico && !isBoolean(aprovacao_servico)) {
            return new Error("Marcação para 'aprovação serviço' inválida");
        }

        if (fechado && !isBoolean(fechado)) {
            return new Error("Marcação para 'fechado' inválida");
        }

        if (pagamento && !isBoolean(pagamento)) {
            return new Error("Marcação para 'pagamento' inválida");
        }

        if (
            valor_orcado &&
            (!isNumber(valor_orcado) || isNegative(valor_orcado))
        ) {
            return new Error("Insira um valor válido em valor orçado");
        }

        if (valor_pago && (!isNumber(valor_pago) || isNegative(valor_pago))) {
            return new Error("Insira um valor válido em valor pago");
        }

        const repoServico = getRepository(Servico);
        const servico = await repoServico.findOne(servico_id);
        if (!servico) {
            return new Error("Serviço não existe!");
        }

        const repoProfissional = getRepository(Profissional);
        const profissional = await repoProfissional.findOne(profissional_id);
        if (!profissional) {
            return new Error("Profissional não existe!");
        }

        const repo = getRepository(ProfissionalServico);
        const profissionalServico = repo.create({
            servico_id,
            profissional_id,
            data_prazo,
            data_entrega,
            convite,
            aceite,
            contrato,
            entrega,
            check,
            ajuste,
            aprovacao_servico,
            fechado,
            pagamento,
            valor_orcado,
            valor_pago,
            observacao,
        });
        await repo.save(profissionalServico);

        return {
            ...profissionalServico,
            servico,
            profissional,
        };
    }
}
