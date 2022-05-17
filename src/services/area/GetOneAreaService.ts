import { FindConditions, getRepository } from "typeorm";
import { Area } from "../../entities/Area";

export class GetOneAreaService {
    async execute(id?: string) {
        const repo = getRepository(Area);

        const where: FindConditions<Area> = {};

        if (id){
            where.id = id;
        }

        const area = await repo.findOne({
            relations: ["disciplinas"],
            where
        });

        return area;
    }

}