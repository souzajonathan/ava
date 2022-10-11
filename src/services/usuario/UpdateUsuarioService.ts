import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Usuario } from "../../entities/Usuario";

type UsuarioUpdateRequest = {
    id: string;
    name: string;
    description: string;
};

export class UpdateUsuarioService {
    async execute({ id, name, description }: UsuarioUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Usuario);
        const usuario = await repo.findOne(id);
        if (!usuario) {
            return new Error("Usuário não existe!");
        }

        const funcaoAlreadyExists = await repo.findOne({ name });
        if (funcaoAlreadyExists && funcaoAlreadyExists.name != usuario.name) {
            return new Error("Usuário já existe");
        }

        usuario.name = name ? name : usuario.name;
        usuario.description = description ? description : usuario.description;

        await repo.save(usuario);

        return usuario;
    }
}
