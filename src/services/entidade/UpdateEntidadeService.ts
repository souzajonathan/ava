import { isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Entidade } from "../../entities/Entidade";
import { Instituicao } from "../../entities/Instituicao";
import { CreateEspecificacaoRodadaService } from "../especificacao_rodada/CreateEspecificacaoRodadaService";
import { CreateFuncaoRodadaService } from "../funcao_rodada/CreateFuncaoRodadaService";

type FuncaoRodada = {
    peso_voto: number;
    considerar_relevantes: string;
    funcao_id: string;
};

type EspecificacaoRodada = {
    nome_rodada: string;
    porcentagem_aprovacao: number;
    numero_rodada: number;
    funcoes?: FuncaoRodada[];
};

type EntidadeUpdateRequest = {
    id: string;
    name?: string;
    description?: string;
    quantidade_rodadas?: number;
    instituicao_id?: string;
    especificacoes?: EspecificacaoRodada[];
    funcoes?: FuncaoRodada[];
};

export class UpdateEntidadeService {
    async execute({
        id,
        name,
        description,
        quantidade_rodadas,
        instituicao_id,
        especificacoes,
        funcoes,
    }: EntidadeUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (instituicao_id && !validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (
            quantidade_rodadas &&
            (!isInt(quantidade_rodadas) || isNegative(quantidade_rodadas))
        ) {
            return new Error(
                "Insira um número válido em quantidade de rodadas de aprovação"
            );
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
            }
        }

        const repo = getRepository(Entidade);
        const entidade = await repo.findOne(id);
        if (!entidade) {
            return new Error("Entidade não existe!");
        }

        if (especificacoes.length) {
            for await (const especificacao of especificacoes) {
                const service = new CreateEspecificacaoRodadaService();

                const resultEspecificacao = await service.execute({
                    nome_rodada: especificacao.nome_rodada,
                    porcentagem_aprovacao: especificacao.porcentagem_aprovacao,
                    numero_rodada: especificacao.numero_rodada,
                    entidade_id: entidade.id,
                    instituicao_id: instituicao_id,
                });

                if (resultEspecificacao instanceof Error) {
                    return resultEspecificacao;
                }

                if (funcoes.length) {
                    for await (const funcao of funcoes) {
                        const service = new CreateFuncaoRodadaService();

                        const resultFuncao = await service.execute({
                            peso_voto: funcao.peso_voto,
                            considerar_relevantes: funcao.considerar_relevantes,
                            funcao_id: funcao.funcao_id,
                            instituicao_id: instituicao_id,
                            especificacao_id: resultEspecificacao.id,
                        });

                        if (resultFuncao instanceof Error) {
                            return resultFuncao;
                        }
                    }
                }
            }
        }

        entidade.name = name ? name : entidade.name;
        entidade.description = description ? description : entidade.description;
        entidade.quantidade_rodadas = quantidade_rodadas
            ? quantidade_rodadas
            : entidade.quantidade_rodadas;
        entidade.instituicao_id = instituicao_id
            ? instituicao_id
            : entidade.instituicao_id;

        await repo.save(entidade);

        return {
            ...entidade,
            funcoes,
            especificacoes,
        };
    }
}
