import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";

type AreaUpdateRequest = {
    id: string;
    name: string;
    description: string;
    instituicao_id: string;
};

export class UpdateAreaService {
    async execute({
        id,
        name,
        description,
        instituicao_id,
    }: AreaUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (instituicao_id && !validate(id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(Area);
        const area = await repo.findOne(id);
        if (!area) {
            return new Error("Área não existe!");
        }

        const areaAlreadyExists = await repo.findOne({ name });
        if (areaAlreadyExists && areaAlreadyExists.name != area.name) {
            return new Error("Área já existe");
        }

        area.name = name ? name : area.name;
        area.description = description ? description : area.description;
        area.instituicao_id = instituicao_id
            ? instituicao_id
            : area.instituicao_id;

        await repo.save(area);

        return area;
    }
}
