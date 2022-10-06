import { getRepository } from "typeorm";
import { Funcao } from "../../entities/Funcao";

type FuncaoRequest = {
    name: string;
    descricao: string;
};

export class CreateAreaService {
    async execute({ name, descricao }: FuncaoRequest) {
        if (!name) {
            return new Error("Nome de função não inserido");
        }

        const repo = getRepository(Funcao);

        const funcaoAlreadyExists = await repo.findOne({ name });
        if (funcaoAlreadyExists) {
            return new Error("Função já existe");
        }

        const funcao = repo.create({
            name,
            descricao,
        });

        await repo.save(funcao);

        return funcao;
    }
}
