import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

type PerfilRequest = {
    ppc_id: string;
    perfil: string;
    perfilNumero: string;
};

export class CreatePerfilService {
    async execute({ ppc_id, perfil, perfilNumero }: PerfilRequest): Promise<PerfilEgresso | Error> {
        const repo = getRepository(PerfilEgresso);

        const perfilEgresso = repo.create({
            ppc_id,
            perfil,
            perfilNumero
        });

        await repo.save(perfilEgresso);

        return perfilEgresso;
    }

}