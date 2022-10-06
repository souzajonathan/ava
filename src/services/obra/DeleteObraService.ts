import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";

export class DeleteObraService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Obra);
        const obra = await repo.findOne(id, {
            relations: ["bibliografias", "obraAutores", "obraChildren"],
        });

        if (!obra) {
            return new Error("Obra não existe!");
        }

        if (obra.bibliografias.length > 0) {
            return new Error("Obra com bibliografias cadastradas");
        }

        if (obra.obraAutores.length > 0) {
            return new Error("Obra com autores cadastrados");
        }

        if (obra.obraChildren.length > 0) {
            return new Error("Obra com obras cadastradas");
        }

        await repo.delete(id);
    }
}
