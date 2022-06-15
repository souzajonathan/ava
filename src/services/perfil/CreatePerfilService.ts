import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilRequest = {
    ppc_id: string;
    perfil: string;
    perfilNumero: string;
}

export class CreatePerfilService {
    async execute({ ppc_id, perfil, perfilNumero }: PerfilRequest) {
        if(!ppc_id || !perfil || !perfilNumero){
            return new Error("Preencha os itens obrigatórios");
        }
        
        if(!validate(ppc_id)){
            return new Error("ID de PPC inválido");
        }
        
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if(!ppc) {
            return new Error("Ppc não existe!");
        }

        const repo = getRepository(PerfilEgresso);
        const perfilEgresso = repo.create({
            ppc_id,
            perfil,
            perfilNumero
        });

        await repo.save(perfilEgresso);

        return {
            ...perfilEgresso, ppc
        };
    }
}