import {
    isBoolean,
    isDate,
    isInt,
    isNegative,
    isNumber,
} from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Profissional } from "../../entities/Profissional";
import { ProfissionalServico } from "../../entities/ProfissionalServico";
import { Servico } from "../../entities/Servico";

type ProfissionalServicoUpdateRequest = {
    id: string;
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

export class UpdateProfissionalServicoService {
    async execute({
        id,
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
    }: ProfissionalServicoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (servico_id && !validate(servico_id)) {
            return new Error("ID de serviço inválido");
        }

        if (profissional_id && !validate(profissional_id)) {
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

        const repo = getRepository(ProfissionalServico);
        const profissionalServico = await repo.findOne(id);
        if (!profissionalServico) {
            return new Error("Profissional num serviço não existe");
        }

        if (servico_id) {
            const repoServico = getRepository(Servico);
            const servico = await repoServico.findOne(servico_id);
            if (!servico) {
                return new Error("Serviço não existe!");
            }
        }

        if (profissional_id) {
            const repoProfissional = getRepository(Profissional);
            const profissional = await repoProfissional.findOne(
                profissional_id
            );
            if (!profissional) {
                return new Error("Profissional não existe!");
            }
        }

        profissionalServico.servico_id = servico_id
            ? servico_id
            : profissionalServico.servico_id;
        profissionalServico.profissional_id = profissional_id
            ? profissional_id
            : profissionalServico.profissional_id;
        profissionalServico.data_prazo = data_prazo
            ? data_prazo
            : profissionalServico.data_prazo;
        profissionalServico.data_entrega = data_entrega
            ? data_entrega
            : profissionalServico.data_entrega;
        if (convite != undefined && convite != null) {
            profissionalServico.convite = convite;
        }
        if (aceite != undefined && aceite != null) {
            profissionalServico.aceite = aceite;
        }
        profissionalServico.contrato = contrato
            ? contrato
            : profissionalServico.contrato;
        if (entrega != undefined && entrega != null) {
            profissionalServico.entrega = entrega;
        }
        if (check != undefined && check != null) {
            profissionalServico.check = check;
        }
        profissionalServico.ajuste = ajuste
            ? ajuste
            : profissionalServico.ajuste;
        if (aprovacao_servico != undefined && aprovacao_servico != null) {
            profissionalServico.aprovacao_servico = aprovacao_servico;
        }
        if (fechado != undefined && fechado != null) {
            profissionalServico.fechado = fechado;
        }
        if (pagamento != undefined && pagamento != null) {
            profissionalServico.pagamento = pagamento;
        }
        profissionalServico.valor_orcado = valor_orcado
            ? valor_orcado
            : profissionalServico.valor_orcado;
        profissionalServico.valor_pago = valor_pago
            ? valor_pago
            : profissionalServico.valor_pago;
        profissionalServico.observacao = observacao
            ? observacao
            : profissionalServico.observacao;

        await repo.save(profissionalServico);

        return profissionalServico;
    }
}
