import { getRepository } from "typeorm";
import { Usuario } from "../../entities/Usuario";

type UsuarioRequest = {
    name: string;
    description: string;
};

export class CreateUsuarioService {
    async execute({ name, description }: UsuarioRequest) {
        if (!name) {
            return new Error("Nome de usuário não inserido");
        }

        const repo = getRepository(Usuario);

        const usuarioAlreadyExists = await repo.findOne({ name });
        if (usuarioAlreadyExists) {
            return new Error("Usuário já existe");
        }

        const usuario = repo.create({
            name,
            description,
        });

        await repo.save(usuario);

        return usuario;
    }
}
