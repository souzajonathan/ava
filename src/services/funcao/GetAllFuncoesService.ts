import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";

export class GetAllFuncoesService {
    async execute() {
        const repo = getRepository(Funcao);

        const funcoes = await repo.find({
            relations: [
                "agentes",
                "funcoesRodadas",
                "tiposServicos",
                "profissionais",
            ],
        });

        return funcoes;
    }

    async findByTipo(tipo_id: string) {
        if (!validate(tipo_id)) {
            return new Error("ID inválido");
        }
        const repo = getRepository(Funcao);

        const funcoes = await repo
            .createQueryBuilder("funcao")
            .leftJoinAndSelect("funcao.agentes", "agentes")
            .leftJoinAndSelect("funcao.funcoesRodadas", "funcoesRodadas")
            .leftJoinAndSelect("funcao.profissionais", "profissionais")
            .leftJoinAndSelect("funcao.tiposServicos", "tiposServicos")
            .where("tiposServicos.id = :id", { id: tipo_id })
            .getMany();

        if (!funcoes.length) {
            return new Error(
                "Não foram encontradas funções cadastradas com esse tipo de serviço"
            );
        }

        return funcoes;
    }

    async findByProfissional(profissional_id: string) {
        if (!validate(profissional_id)) {
            return new Error("ID inválido");
        }
        const repo = getRepository(Funcao);

        const funcoes = await repo
            .createQueryBuilder("funcao")
            .leftJoinAndSelect("funcao.agentes", "agentes")
            .leftJoinAndSelect("funcao.funcoesRodadas", "funcoesRodadas")
            .leftJoinAndSelect("funcao.tiposServicos", "tiposServicos")
            .leftJoinAndSelect("funcao.profissionais", "profissionais")
            .where("profissionais.id = :id", { id: profissional_id })
            .getMany();

        if (!funcoes.length) {
            return new Error(
                "Não foram encontradas funções cadastradas com esse profissional"
            );
        }

        return funcoes;
    }
}
