import { isDecimal, isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Entidade } from "../../entities/Entidade";
import { EspecificacoesRodadas } from "../../entities/EspecificacoesRodadas";
import { Instituicao } from "../../entities/Instituicao";
import { CreateFuncaoRodadaService } from "../funcao_rodada/CreateFuncaoRodadaService";

type FuncaoRodada = {
    peso_voto: number;
    considerar_relevantes: string;
    funcao_id: string;
};

type EspecificacaoRodadaUpdateRequest = {
    id: string;
    nome_rodada?: string;
    porcentagem_aprovacao?: number;
    numero_rodada?: number;
    entidade_id?: string;
    instituicao_id?: string;
    funcoesRodada?: FuncaoRodada[];
};

export class UpdateEspecificacaoRodadaService {
    async execute({
        id,
        nome_rodada,
        porcentagem_aprovacao,
        numero_rodada,
        entidade_id,
        instituicao_id,
        funcoesRodada,
    }: EspecificacaoRodadaUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (
            porcentagem_aprovacao &&
            (isNegative(porcentagem_aprovacao) ||
                !isDecimal(porcentagem_aprovacao))
        ) {
            return new Error(
                "Insira um número válido em porcentagem de aprovação"
            );
        }

        if (
            numero_rodada &&
            (!isInt(numero_rodada) || isNegative(numero_rodada))
        ) {
            return new Error("Insira um número válido em número da rodada");
        }

        if (entidade_id && !validate(entidade_id)) {
            return new Error("ID de entidade inválido");
        }

        if (instituicao_id && !validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(EspecificacoesRodadas);
        const especificacao = await repo.findOne(id);
        if (!especificacao) {
            return new Error(
                "Especificação de rodada de aprovação não existe!"
            );
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
            }
        }

        if (entidade_id) {
            const repoEntidade = getRepository(Entidade);
            const entidade = await repoEntidade.findOne(entidade_id);
            if (!entidade) {
                return new Error("Entidade não existe!");
            }
        }

        if (funcoesRodada.length) {
            for await (const funcao of funcoesRodada) {
                const service = new CreateFuncaoRodadaService();

                const result = await service.execute({
                    peso_voto: funcao.peso_voto,
                    considerar_relevantes: funcao.considerar_relevantes,
                    funcao_id: funcao.funcao_id,
                    instituicao_id: instituicao_id,
                    especificacao_id: especificacao.id,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        especificacao.nome_rodada = nome_rodada
            ? nome_rodada
            : especificacao.nome_rodada;
        especificacao.porcentagem_aprovacao = porcentagem_aprovacao
            ? porcentagem_aprovacao
            : especificacao.porcentagem_aprovacao;
        especificacao.numero_rodada = numero_rodada
            ? numero_rodada
            : especificacao.numero_rodada;
        especificacao.entidade_id = entidade_id
            ? entidade_id
            : especificacao.entidade_id;
        especificacao.instituicao_id = instituicao_id
            ? instituicao_id
            : especificacao.instituicao_id;

        await repo.save(especificacao);

        return {
            ...especificacao,
            funcoesRodada,
        };
    }
}
