import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class DeletePerfilService {
    async execute(id: string) {
        const repo = getRepository(PerfilEgresso);
        
        if(!(await repo.findOne(id))){
            return new Error("Perfil do egresso não existente!");
        }

        await repo.delete(id);
    }
}