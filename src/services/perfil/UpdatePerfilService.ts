import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilUpdateRequest = {
    id: string;
    ppc_id: string;
    perfil: string;
    perfilNumero: number;
}

export class UpdatePerfilService {
    async execute ({id, ppc_id, perfil, perfilNumero}: PerfilUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        if(ppc_id && !validate(ppc_id)){
            return new Error("ID de PPC inválido");
        }

        if(perfilNumero && !Number.isInteger(perfilNumero)){
            return new Error("Insira um número válido em número de perfil");
        }
        
        const repo = getRepository(PerfisEgresso);
        const perfilEgresso = await repo.findOne(id);
        if (!perfilEgresso) {
            return new Error("Perfil não existente!");
        }
        
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if (!ppc) {
            return new Error("Ppc não existe!");
        }

        perfilEgresso.ppc_id = ppc_id ? ppc_id : perfilEgresso.ppc_id;
        perfilEgresso.perfil = perfil ? perfil : perfilEgresso.perfil;
        perfilEgresso.perfilNumero = perfilNumero ? perfilNumero : perfilEgresso.perfilNumero;

        await repo.save(perfilEgresso);

        return {
            ...perfilEgresso, ppc
        };
    }
}