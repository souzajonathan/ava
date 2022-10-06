import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";

type FuncaoUpdateRequest = {
    id: string;
    name: string;
    descricao: string;
};

export class UpdateFuncaoService {
    async execute({ id, name, descricao }: FuncaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Funcao);
        const funcao = await repo.findOne(id);
        if (!funcao) {
            return new Error("Função não existe!");
        }

        const funcaoAlreadyExists = await repo.findOne({ name });
        if (funcaoAlreadyExists && funcaoAlreadyExists.name != funcao.name) {
            return new Error("Função já existe");
        }

        funcao.name = name ? name : funcao.name;
        funcao.descricao = descricao ? descricao : funcao.descricao;

        await repo.save(funcao);

        return funcao;
    }
}
