import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class DeletePerfilService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(PerfilEgresso);
        
        if(!(await repo.findOne(id))){
            return new Error("Perfil do egresso não existente!");
        }

        await repo.delete(id);
    }
}