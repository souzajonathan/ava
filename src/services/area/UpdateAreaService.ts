import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";

type AreaUpdateRequest = {
    id: string;
    name: string;
    description: string;
};

export class UpdateAreaService {
    async execute({ id, name, description }: AreaUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Area);
        const area = await repo.findOne(id);
        if (!area) {
            return new Error("Área não existe!");
        }

        const areaAlreadyExists = await repo.findOne({ name });
        if (areaAlreadyExists) {
            return new Error("Área já existe");
        }

        area.name = name ? name : area.name;
        area.description = description ? description : area.description;

        await repo.save(area);

        return area;
    }
}
