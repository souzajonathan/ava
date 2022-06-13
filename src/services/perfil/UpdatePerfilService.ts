import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilUpdateRequest = {
    id: string;
    ppc_id: string;
    perfil: string;
    perfilNumero: string;
}

export class UpdatePerfilService {
    async execute ({id, ppc_id, perfil, perfilNumero}: PerfilUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        if(ppc_id){
            if(!validate(ppc_id)){
                return new Error("ID de PPC inválido");
            }
        }
        
        const repo = getRepository(PerfilEgresso);
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
        perfilEgresso.perfilNumero = perfilNumero ? perfil : perfilEgresso.perfilNumero;

        await repo.save(perfilEgresso);

        return {
            ...perfilEgresso, ppc
        };
    }
}