import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Usuario } from "../../entities/Usuario";

export class GetOneUsuarioService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Usuario);

        const usuario = await repo.findOne(id, {
            relations: ["agentes"],
        });

        if (!usuario) {
            return new Error("Usuário não existe!");
        }

        return usuario;
    }
}
