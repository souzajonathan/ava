import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";
import { TiposServicos } from "../../entities/TiposServicos";

type FuncaoTipoRequest = {
    funcao_id: string;
    tipo_id: string;
};

export class CreateFuncaoTipoService {
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
            return new Error("Função não existe!");
        }

        const repoTipo = getRepository(TiposServicos);
        const tipo = await repoTipo.findOne(tipo_id);
        if (!tipo) {
            return new Error("Tipo de serviço não existe!");
        }

        funcao.tiposServicos = [...funcao.tiposServicos, tipo];

        await repoFuncoes.save(funcao);

        return funcao;
    }
}
