import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";

export class GetOneObraService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Obra);

        const obra = await repo
            .createQueryBuilder("obra")
            .where({
                id: id,
            })
            .leftJoin("obra.bibliografias", "bibliografias")
            .select(["obra", "bibliografias.tipo"])
            .leftJoinAndSelect("obra.obraAutores", "obraAutor")
            .leftJoinAndSelect("obraAutor.autor", "autor")
            .leftJoinAndSelect("obra.obraChildren", "obraChildren")
            .leftJoinAndSelect("obra.obraParent", "obraParent")
            .getOne();

        if (!obra) {
            return new Error("Obra não existe!");
        }

        return obra;
    }
}
