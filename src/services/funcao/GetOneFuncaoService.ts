import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";
import { validate} from "uuid";

export class GetOneAreaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

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