import { isNegative, isNumber } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { EspecificacoesRodadas } from "../../entities/EspecificacoesRodadas";
import { Funcao } from "../../entities/Funcao";
import { FuncoesRodada } from "../../entities/FuncoesRodada";
import { Instituicao } from "../../entities/Instituicao";

type FuncaoRodadaRequest = {
    peso_voto: number;
    considerar_relevantes: string;
    especificacao_id: string;
    funcao_id: string;
    instituicao_id: string;
};

export class CreateFuncaoRodadaService {
    async execute({
        peso_voto,
        considerar_relevantes,
        especificacao_id,
        funcao_id,
        instituicao_id,
    }: FuncaoRodadaRequest) {
        if (!validate(especificacao_id)) {
            return new Error(
                "ID de especificações das rodadas de aprovação inválido"
            );
        }

        if (!validate(funcao_id)) {
            return new Error("ID de função inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!isNumber(peso_voto) || isNegative(peso_voto)) {
            return new Error("Insira um valor válido em peso voto");
        }

        const repoEspecificacao = getRepository(EspecificacoesRodadas);
        const especificacao = await repoEspecificacao.findOne(especificacao_id);
        if (!especificacao) {
            return new Error("Especificação não existe!");
        }

        const repoFuncao = getRepository(Funcao);
        const funcao = await repoFuncao.findOne(funcao_id);
        if (!funcao) {
            return new Error("Função não existe!");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repo = getRepository(FuncoesRodada);

        const funcaoRodada = repo.create({
            peso_voto,
            considerar_relevantes,
            especificacao_id,
            funcao_id,
            instituicao_id,
        });

        await repo.save(funcaoRodada);

        return funcaoRodada;
    }
}
