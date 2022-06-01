import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";

export class DeleteObraService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Obra);
        
        if(!(await repo.findOne(id))){
            return new Error("Obra não existe!");
        }

        await repo.delete(id);
    }
}