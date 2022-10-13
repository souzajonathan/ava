import { getRepository } from "typeorm";
import { Funcao } from "../../entities/Funcao";

type FuncaoRequest = {
    name: string;
    description: string;
};

export class CreateFuncaoService {
    async execute({ name, description }: FuncaoRequest) {
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
            description,
        });

        await repo.save(funcao);

        return funcao;
    }
}
