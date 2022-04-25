import { getRepository } from "typeorm";
import { Area } from "../entities/Area";

type AreaRequest = {
    name: string;
    description: string;
};

export class CreateAreaService {
    async execute({ name, description }: AreaRequest): Promise<Area | Error> {
        const repo = getRepository(Area);

        if(await repo.findOne({name})) {
            return new Error("Área já existe");
        }

        const area = repo.create({
            name,
            description
        });

        await repo.save(area);

        return area;
    }

}