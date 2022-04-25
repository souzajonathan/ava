import { getRepository } from "typeorm";
import { Area } from "../entities/Area";

export class DeleteAreaService {
    async execute(id: string) {
        const repo = getRepository(Area);
        
        if(!(await repo.findOne(id))){
            return new Error("Área não existe!");
        }

        await repo.delete(id);
    }
}