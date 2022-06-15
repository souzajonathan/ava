import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ObraAutor } from "../../entities/ObraAutor";

export class GetOneObraAutorService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(ObraAutor);

        const obraAutor = await repo.findOne(id, {
            relations: ["autores", "obras"]
        });

        if (!obraAutor) {
            return new Error("obra_autor não existe!");
        }

        return obraAutor;
    }
}