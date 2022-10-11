import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Profissional } from "../../entities/Profissional";

type ProfissionalUpdateRequest = {
    id: string;
    name: string;
    description: string;
};

export class UpdateProfissionalService {
    async execute({ id, name, description }: ProfissionalUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Profissional);
        const profissional = await repo.findOne(id);
        if (!profissional) {
            return new Error("Profissional não existe!");
        }

        const profissionalAlreadyExists = await repo.findOne({ name });
        if (
            profissionalAlreadyExists &&
            profissionalAlreadyExists.name != profissional.name
        ) {
            return new Error("Profissional já existe");
        }

        profissional.name = name ? name : profissional.name;
        profissional.description = description
            ? description
            : profissional.description;

        await repo.save(profissional);

        return profissional;
    }
}
