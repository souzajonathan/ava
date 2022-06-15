import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfisEgresso } from "../../entities/PerfisEgresso";

export class DeletePerfilService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(PerfisEgresso);
        const perfil = await repo.findOne(id);
        
        if(!perfil){
            return new Error("Perfil do egresso não existente!");
        }

        await repo.delete(id);
    }
}