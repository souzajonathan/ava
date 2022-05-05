import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

type PerfilUpdateRequest = {
    id: string;
    ppc_id: string;
    perfil: string;
    perfilNumero: string;
};

export class UpdatePerfilService {
    async execute ({id, ppc_id, perfil, perfilNumero}: PerfilUpdateRequest) {
        const repo = getRepository(PerfilEgresso);

        const perfilEgresso = await repo.findOne(id);

        if (!perfilEgresso) {
            return new Error("Perfil não existente!");
        }

        perfilEgresso.ppc_id = ppc_id ? ppc_id : perfilEgresso.ppc_id;
        perfilEgresso.perfil = perfil ? perfil : perfilEgresso.perfil;
        perfilEgresso.perfilNumero = perfilNumero ? perfil : perfilEgresso.perfilNumero;

        await repo.save(perfilEgresso);

        return perfilEgresso;
    }
}