import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class GetOnePerfilService {
    async execute(id: string) {
        const repo = getRepository(PerfilEgresso);

        /* const perfil = await repo.findOne(id, {
            relations: ["ppc"]
        }); */

        const perfil = await repo
            .createQueryBuilder("perfil")
            .where({
                id: id
            })
            .leftJoinAndSelect("perfil.ppc", "ppc")
            .leftJoinAndSelect("ppc.versoesPdv", "versoesPdv")
            .leftJoinAndSelect("versoesPdv.versoes", "versoes")
            .getMany();

        if (!perfil) {
            return new Error("Perfil não existe!");
        }

        return perfil;
    }

}