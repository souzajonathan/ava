import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";
import { Instituicao } from "../../entities/Instituicao";

type AreaRequest = {
    name: string;
    description: string;
    instituicao_id: string;
};

export class CreateAreaService {
    async execute({ name, description, instituicao_id }: AreaRequest) {
        if (!name) {
            return new Error("Nome de área não inserido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repo = getRepository(Area);

        const areaAlreadyExists = await repo.findOne({ name });
        if (areaAlreadyExists) {
            return new Error("Área já existe");
        }

        const area = repo.create({
            name,
            description,
            instituicao_id,
        });

        await repo.save(area);

        return area;
    }
}
