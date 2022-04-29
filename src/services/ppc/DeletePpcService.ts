import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

export class DeletePpcService {
    async execute(id: string) {
        const repo = getRepository(Ppc);
        
        if(!(await repo.findOne(id))){
            return new Error("Ppc não existe!");
        }

        await repo.delete(id);
    }
}