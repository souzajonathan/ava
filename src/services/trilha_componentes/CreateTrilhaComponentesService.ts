import { isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

type TrilhaComponentesRequest = {
    nome_versao_trilha: string;
    quantidade_creditos: number;
    observacoes: string;
};

export class CreateTrilhaComponentesService {
    async execute({
        nome_versao_trilha,
        quantidade_creditos,
        observacoes,
    }: TrilhaComponentesRequest) {
        if (!nome_versao_trilha) {
            return new Error("Nome de versão de trilha não inserido");
        }

        if (!isInt(quantidade_creditos) || isNegative(quantidade_creditos)) {
            return new Error(
                "Insira um número válido em 'quantidade de créditos"
            );
        }

        const repo = getRepository(TrilhaComponentes);
        const trilhaAlreadyExists = await repo.findOne({ nome_versao_trilha });
        if (trilhaAlreadyExists) {
            return new Error("Nome de versão de trilha já existe");
        }

        const trilhaComponentes = repo.create({
            nome_versao_trilha,
            quantidade_creditos,
            observacoes,
        });

        await repo.save(trilhaComponentes);

        return trilhaComponentes;
    }
}
