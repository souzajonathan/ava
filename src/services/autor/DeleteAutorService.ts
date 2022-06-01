import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";

export class DeleteAutorService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Autor);
        
        if(!(await repo.findOne(id))){
            return new Error("Autor não existe!");
        }

        await repo.delete(id);
    }
}