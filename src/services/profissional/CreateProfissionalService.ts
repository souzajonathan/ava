import { getRepository } from "typeorm";
import { Profissional } from "../../entities/Profissional";

type ProfissionalRequest = {
    name: string;
    description: string;
};

export class CreateProfissionalService {
    async execute({ name, description }: ProfissionalRequest) {
        if (!name) {
            return new Error("Nome de profissional não inserido");
        }

        const repo = getRepository(Profissional);

        const profissionalAlreadyExists = await repo.findOne({ name });
        if (profissionalAlreadyExists) {
            return new Error("Profissional já existe");
        }

        const profissional = repo.create({
            name,
            description,
        });

        await repo.save(profissional);

        return profissional;
    }
}
