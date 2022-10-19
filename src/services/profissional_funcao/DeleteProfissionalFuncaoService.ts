import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";

type ProfissionalFuncaoRequest = {
    profissional_id: string;
    funcao_id: string;
};

export class DeleteProfissionalFuncaoService {
    async execute({ profissional_id, funcao_id }: ProfissionalFuncaoRequest) {
        if (!validate(funcao_id)) {
            return new Error("ID de função inválido");
        }

        if (!validate(profissional_id)) {
            return new Error("ID de profissional inválido");
        }

        const repoFuncoes = getRepository(Funcao);

        const funcao = await repoFuncoes.findOne(funcao_id, {
            relations: ["profissionais"],
        });

        if (!funcao) {
            return new Error("FuncaoProfissional não existe!");
        }

        funcao.profissionais = funcao.profissionais.filter(
            (funcaoProfissional) => {
                return funcaoProfissional.id !== profissional_id;
            }
        );

        await repoFuncoes.save(funcao);

        return funcao;
    }
}
