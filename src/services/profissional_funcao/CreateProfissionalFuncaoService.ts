import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Funcao } from "../../entities/Funcao";
import { Profissional } from "../../entities/Profissional";

type ProfissionalFuncaoRequest = {
    profissional_id: string;
    funcao_id: string;
};

export class CreateProfissionalFuncaoService {
    async execute({ funcao_id, profissional_id }: ProfissionalFuncaoRequest) {
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
            return new Error("Função não existe!");
        }

        const repoProfissionais = getRepository(Profissional);
        const profissional = await repoProfissionais.findOne(profissional_id);
        if (!profissional) {
            return new Error("Profissional não existe!");
        }

        funcao.profissionais = [...funcao.profissionais, profissional];

        await repoFuncoes.save(funcao);

        return funcao;
    }
}
