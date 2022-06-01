import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PerfilPpcDisciplinaVersaoRequest = {
    perfil_id: string;
    ppcDisciplinaVersao_id: string;
}

export class DeletePerfilPpcDisciplinaVersaoService {
    async execute ({perfil_id, ppcDisciplinaVersao_id}: PerfilPpcDisciplinaVersaoRequest) {
        if (!validate(perfil_id || ppcDisciplinaVersao_id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(PpcDisciplinaVersao);

        const ppcDisciplinaVersao = await repo.findOne(ppcDisciplinaVersao_id, {relations: ["perfis"]});

        if(!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existe!");
        }

        ppcDisciplinaVersao.perfis = ppcDisciplinaVersao.perfis.filter( (perfil) => {
            return perfil.id !== perfil_id;
        });

        await repo.save(ppcDisciplinaVersao);

        return {
            ppcDisciplinaVersao
        };
    }
}