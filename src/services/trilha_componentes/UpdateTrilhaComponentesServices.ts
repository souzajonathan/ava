import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

type TrilhaComponentesUpdateRequest = {
    id: string;
    nome_versao_trilha: string;
    quantidade_creditos: number;
    observacoes: string;
};

export class UpdateTrilhaComponentesService {
    async execute({
        id,
        nome_versao_trilha,
        quantidade_creditos,
        observacoes,
    }: TrilhaComponentesUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TrilhaComponentes);
        const trilhaComponentes = await repo.findOne(id);
        if (!trilhaComponentes) {
            return new Error("Trilha de componentes não existe!");
        }

        const trilhaAlreadyExists = await repo.findOne({ nome_versao_trilha });
        if (trilhaAlreadyExists) {
            return new Error("Tipo já existe");
        }

        if (quantidade_creditos && !Number.isInteger(quantidade_creditos)) {
            return new Error(
                "Insira um número válido em 'quantidade de créditos"
            );
        }

        trilhaComponentes.nome_versao_trilha = nome_versao_trilha
            ? nome_versao_trilha
            : trilhaComponentes.nome_versao_trilha;
        trilhaComponentes.quantidade_creditos = quantidade_creditos
            ? quantidade_creditos
            : trilhaComponentes.quantidade_creditos;
        trilhaComponentes.observacoes = observacoes
            ? observacoes
            : trilhaComponentes.observacoes;

        await repo.save(trilhaComponentes);

        return trilhaComponentes;
    }
}
