import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";

export class GetOneAreaService {
    async execute(id: string) {
        const repo = getRepository(Area);
        
        const area = await repo.findOne(id, {
            relations: ["disciplinas"]
        });

        if (!area) {
            return new Error("Área não existe!");
        }

        return area;
    }

}