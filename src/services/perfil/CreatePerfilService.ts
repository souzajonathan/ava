import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilRequest = {
    ppc_id: string;
    perfil: string;
    perfilNumero: string;
};

export class CreatePerfilService {
    async execute({ ppc_id, perfil, perfilNumero }: PerfilRequest) {
        const repo = getRepository(PerfilEgresso);
        const repoPpc = getRepository(Ppc);

        const ppc = await repoPpc.findOne(ppc_id);

        if(!ppc) {
            return new Error("Ppc não existe!");
        }

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