import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";

type FuncaoTipoRequest = {
    funcao_id: string;
    tipo_id: string;
};

export class DeleteFuncaoTipoService {
    async execute({ funcao_id, tipo_id }: FuncaoTipoRequest) {
        if (!validate(funcao_id)) {
            return new Error("ID de função inválido");
        }

        if (!validate(tipo_id)) {
            return new Error("ID de tipo de serviço inválido");
        }

        const repoFuncoes = getRepository(Funcao);

        const funcao = await repoFuncoes.findOne(funcao_id, {
            relations: ["tiposServicos"],
        });

        if (!funcao) {
            return new Error("FuncaoTipo não existe!");
        }

        funcao.tiposServicos = funcao.tiposServicos.filter((funcaoTipo) => {
            return funcaoTipo.id !== tipo_id;
        });

        await repoFuncoes.save(funcao);

        return funcao;
    }
}
