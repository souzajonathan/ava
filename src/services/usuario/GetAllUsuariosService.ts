import { getRepository } from "typeorm";
import { Usuario } from "../../entities/Usuario";

export class GetAllUsuariosService {
    async execute() {
        const repo = getRepository(Usuario);

        const usuarios = await repo.find({
            relations: ["agentes"],
        });

        return usuarios;
    }
}
