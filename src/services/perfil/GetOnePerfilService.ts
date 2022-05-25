import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class GetOnePerfilService {
    async execute(id: string) {
        const repo = getRepository(PerfilEgresso);

        const perfil = await repo.findOne(id, {
            relations: ["ppc"]
        });

        if (!perfil) {
            return new Error("Perfil não existe!");
        }

        return perfil;
    }

}