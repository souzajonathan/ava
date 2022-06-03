import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Bibliografia } from "../../entities/Bibliografia";

export class DeleteBibliografiaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(Bibliografia);
        const bibliografia = await repo.findOne(id);

        if(!(bibliografia)){
            return new Error("Bibliografia não existente!");
        }

        await repo.delete(id);
    }
}