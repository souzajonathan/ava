import { getRepository } from "typeorm";
import { Area } from "../entities/Area";

type AreaUpdateRequest = {
    id: string;
    name: string;
    description: string;
};

export class UpdateAreaService {
    async execute ({id, name, description}: AreaUpdateRequest) {
        const repo = getRepository(Area);

        const area = await repo.findOne(id);

        if (!area) {
            return new Error("Área não existe!");
        }

        area.name = name ? name : area.name;
        area.description = description ? description : area.description;

        await repo.save(area);

        return area;
    }
}