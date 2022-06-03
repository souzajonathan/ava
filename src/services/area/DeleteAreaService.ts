import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";

export class DeleteAreaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(Area);
        const area = await repo.findOne(id, {
            relations: ["disciplinas"]
        });
        
        if(!area){
            return new Error("Área não existe!");
        }

        if(area.disciplinas.length > 0){
            return new Error("Área com disciplinas cadastradas");
        }

        await repo.delete(id);
    }
}