import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";

type AreaRequest = {
    name: string;
    description: string;
};

export class CreateAreaService {
    async execute({ name, description }: AreaRequest): Promise<Area | Error> {
        if(!name){
            return new Error("Nome de área não inserido");
        }
        const repo = getRepository(Area);
        const areaAlreadyExists = await repo.findOne({name});

        if(areaAlreadyExists) {
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