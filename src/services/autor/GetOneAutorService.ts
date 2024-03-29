import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";

export class GetOneAutorService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Autor);

        const autor = await repo
            .createQueryBuilder("autor")
            .where({
                id: id,
            })
            .leftJoinAndSelect("autor.obrasAutor", "obraAutor")
            .leftJoinAndSelect("obraAutor.obra", "obra")
            .getOne();

        if (!autor) {
            return new Error("Autor não existe!");
        }

        return autor;
    }
}
