import { getRepository } from "typeorm";
import { Profissional } from "../../entities/Profissional";

type UsuarioRequest = {
    name: string;
    descricao: string;
};

export class CreateProfissionalService {
    async execute({ name, descricao }: UsuarioRequest) {
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
            descricao,
        });

        await repo.save(profissional);

        return profissional;
    }
}
