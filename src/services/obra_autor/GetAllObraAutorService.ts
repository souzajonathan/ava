import { getRepository } from "typeorm";
import { ObraAutor } from "../../entities/ObraAutor";

export class GetAllObraAutorService {
    async execute() {
        const repo = getRepository(ObraAutor);

        const obraAutor = await repo.find({
            relations: ["autores", "obras"]
        });

        return obraAutor;
    }
}