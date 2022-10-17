import { isInt, isNegative, isNumber } from "class-validator";
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

type EspecificacaoRodadaRequest = {
    nome_rodada: string;
    porcentagem_aprovacao: number;
    numero_rodada: number;
    entidade_id: string;
    instituicao_id: string;
    funcoesRodada?: FuncaoRodada[];
};

export class CreateEspecificacaoRodadaService {
    async execute({
        nome_rodada,
        porcentagem_aprovacao,
        numero_rodada,
        entidade_id,
        instituicao_id,
        funcoesRodada,
    }: EspecificacaoRodadaRequest) {
        if (!validate(entidade_id)) {
            return new Error("ID de entidade inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!nome_rodada) {
            return new Error("Nome da rodada é obrigatório");
        }

        if (
            !isNumber(porcentagem_aprovacao) ||
            isNegative(porcentagem_aprovacao)
        ) {
            return new Error(
                "Insira um valor válido para porcentagem de aprovação"
            );
        }

        if (!isInt(numero_rodada) || isNegative(numero_rodada)) {
            return new Error("Insira um número de rodada válido");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repoEntidade = getRepository(Entidade);
        const entidade = await repoEntidade.findOne(entidade_id);
        if (!entidade) {
            return new Error("Entidade não existe!");
        }

        const repo = getRepository(EspecificacoesRodadas);
        const especificacao = repo.create({
            nome_rodada,
            porcentagem_aprovacao,
            numero_rodada,
            entidade_id,
            instituicao_id,
        });
        await repo.save(especificacao);

        if (funcoesRodada) {
            for await (const funcao of funcoesRodada) {
                const service = new CreateFuncaoRodadaService();

                const result = await service.execute({
                    peso_voto: funcao.peso_voto,
                    considerar_relevantes: funcao.considerar_relevantes,
                    funcao_id: funcao.funcao_id,
                    especificacao_id: especificacao.id,
                    instituicao_id: instituicao_id,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        return {
            ...especificacao,
            funcoesRodada,
        };
    }
}
