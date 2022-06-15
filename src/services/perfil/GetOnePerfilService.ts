import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class GetOnePerfilService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

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
            .leftJoinAndSelect("ppc.ppcDisciplinaVersoes", "ppcDisciplinaVersoes")
            .leftJoinAndSelect("ppcDisciplinaVersoes.versoes", "versoes")
            .getOne();

        if (!perfil) {
            return new Error("Perfil não existe!");
        }

        return perfil;
    }

}