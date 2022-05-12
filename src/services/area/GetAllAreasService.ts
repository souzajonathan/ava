import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";

export class GetAllAreasService {
    async execute() {
        const repo = getRepository(Area);

        const areas = await repo.find({
            relations: ["disciplinas"]
        });

        return areas;
    }
}