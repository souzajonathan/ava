import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PerfilPpcDisciplinaVersaoRequest = {
    perfil_id: string;
    ppcDisciplinaVersao_id: string;
}

export class CreatePerfilPpcDisciplinaVersaoService {
    async execute ({perfil_id, ppcDisciplinaVersao_id}: PerfilPpcDisciplinaVersaoRequest) {
        if (!validate(perfil_id || ppcDisciplinaVersao_id)){
            return new Error("ID's inválidos");
        }
        const repo = getRepository(PpcDisciplinaVersao);
        const repoPerfis = getRepository(PerfilEgresso);

        const ppcDisciplinaVersao = await repo.findOne(ppcDisciplinaVersao_id, {relations: ["competencias", "perfis"]});
        const perfil = await repoPerfis.findOne(perfil_id);

        if(!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existe!");
        }

        if(!perfil) {
            return new Error("Perfil não existe!");
        }

        ppcDisciplinaVersao.perfis = [...ppcDisciplinaVersao.perfis, perfil];

        await repo.save(ppcDisciplinaVersao);

        return {
            ppcDisciplinaVersao
        };
    }
}