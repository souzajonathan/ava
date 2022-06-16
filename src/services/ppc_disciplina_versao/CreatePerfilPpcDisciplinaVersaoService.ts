import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
import { PpcDisciplinaVersao } from "../../entities/PpcDisciplinaVersao";

type PerfilPpcDisciplinaVersaoRequest = {
    perfil_id: string;
    ppcDisciplinaVersao_id: string;
}

export class CreatePerfilPpcDisciplinaVersaoService {
    async execute ({perfil_id, ppcDisciplinaVersao_id}: PerfilPpcDisciplinaVersaoRequest) {
        if (!validate(perfil_id)){
            return new Error("ID de perfil inválido");
        }

        if (!validate(ppcDisciplinaVersao_id)){
            return new Error("ID de Ppc_disciplina_versão inválido");
        }

        const repoPerfis = getRepository(PerfisEgresso);
        const perfil = await repoPerfis.findOne(perfil_id);
        if(!perfil) {
            return new Error("Perfil não existe!");
        }

        const repo = getRepository(PpcDisciplinaVersao);
        const ppcDisciplinaVersao = await repo.findOne(ppcDisciplinaVersao_id, {relations: ["competencias", "perfis"]});
        if(!ppcDisciplinaVersao) {
            return new Error("Ppc_Disciplina_Versão não existe!");
        }

        ppcDisciplinaVersao.perfis = [...ppcDisciplinaVersao.perfis, perfil];

        await repo.save(ppcDisciplinaVersao);

        return ppcDisciplinaVersao;
    }
}