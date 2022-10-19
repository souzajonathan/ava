import { isNegative, isNumber } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { EspecificacoesRodadas } from "../../entities/EspecificacoesRodadas";
import { Funcao } from "../../entities/Funcao";
import { FuncoesRodada } from "../../entities/FuncoesRodada";
import { Instituicao } from "../../entities/Instituicao";

type FuncaoRodadaUpdateRequest = {
    id: string;
    peso_voto: number;
    considerar_relevantes: string;
    especificacao_id: string;
    funcao_id: string;
    instituicao_id: string;
};

export class UpdateFuncaoRodadaService {
    async execute({
        id,
        peso_voto,
        considerar_relevantes,
        especificacao_id,
        funcao_id,
        instituicao_id,
    }: FuncaoRodadaUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (instituicao_id && !validate(id)) {
            return new Error("ID de instituição inválido");
        }

        if (especificacao_id && !validate(especificacao_id)) {
            return new Error(
                "ID de especificação da rodada de aprovação inválido"
            );
        }

        if (peso_voto && (!isNumber(peso_voto) || isNegative(peso_voto))) {
            return new Error("Insira um valor válido em peso voto");
        }

        const repo = getRepository(FuncoesRodada);
        const funcoesRodadas = await repo.findOne(id);
        if (!funcoesRodadas) {
            return new Error("Funções por rodada de aprovação não existe!");
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
            }
        }

        if (especificacao_id) {
            const repoEspecificacao = getRepository(EspecificacoesRodadas);
            const especificacao = await repoEspecificacao.findOne(
                especificacao_id
            );
            if (!especificacao) {
                return new Error(
                    "Especificação por rodada de aprovação não existe!"
                );
            }
        }

        if (funcao_id && !validate(funcao_id)) {
            return new Error("ID de função inválido");
        }

        if (funcao_id) {
            const repoFuncao = getRepository(Funcao);
            const funcao = await repoFuncao.findOne(funcao_id);
            if (!funcao) {
                return new Error("Função não existe!");
            }
        }

        funcoesRodadas.peso_voto = peso_voto
            ? peso_voto
            : funcoesRodadas.peso_voto;
        funcoesRodadas.considerar_relevantes = considerar_relevantes
            ? considerar_relevantes
            : funcoesRodadas.considerar_relevantes;
        funcoesRodadas.especificacao_id = especificacao_id
            ? especificacao_id
            : funcoesRodadas.especificacao_id;
        funcoesRodadas.funcao_id = funcao_id
            ? funcao_id
            : funcoesRodadas.funcao_id;
        funcoesRodadas.instituicao_id = instituicao_id
            ? instituicao_id
            : funcoesRodadas.instituicao_id;

        await repo.save(funcoesRodadas);

        return funcoesRodadas;
    }
}
