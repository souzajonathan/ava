import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilRequest = {
    ppc_id: string;
    perfil: string;
    perfilNumero: number;
}

export class CreatePerfilService {
    async execute({ ppc_id, perfil, perfilNumero }: PerfilRequest) {
        if(!validate(ppc_id)){
            return new Error("ID de PPC inválido");
        }

        if(!perfil){
            return new Error("Perfil é obrigatório");
        }

        if(!Number.isInteger(perfilNumero)){
            return new Error("Insira um número válido em 'número de perfil'");
        }
          
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if(!ppc) {
            return new Error("Ppc não existe!");
        }

        const repo = getRepository(PerfisEgresso);
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