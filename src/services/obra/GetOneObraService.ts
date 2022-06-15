import { getRepository } from "typeorm";
import { validate} from "uuid";
import { Obra } from "../../entities/Obra";

export class GetOneObraService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Obra);
        
        /* const obra = await repo.findOne(id, {
            relations: ["bibliografias", "obrasAutores"],
        }); */

        const obra = await repo
            .createQueryBuilder("obra")
            .where({
                id: id
            })
            .leftJoin("obra.bibliografias", "bibliografias")
            .select(["obra", "bibliografias.tipo"])
            .leftJoinAndSelect("obra.obrasAutores", "obraAutor")
            .leftJoinAndSelect("obraAutor.autores", "autores")
            .leftJoinAndSelect("obra.obrasChildren", "obrasChildren")
            .leftJoinAndSelect("obra.obraParent", "obraParent")
            .getOne();

        if (!obra) {
            return new Error("Obra não existe!");
        }

        return obra;
    }

}