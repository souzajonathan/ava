import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ObraAutor } from "../../entities/ObraAutor";

export class DeleteObraAutorService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(ObraAutor);
        const obraAutor = await repo.findOne(id);

        if(!(obraAutor)){
            return new Error("obra_autor não existente!");
        }

        await repo.delete(id);
    }
}