import { FindConditions, getRepository, Raw } from "typeorm";
import { Usuario } from "../../entities/Usuario";

type filter = {
    nome?: string;
    email?: string;
};

export class GetAllUsuariosService {
    async execute(query?: filter) {
        const repo = getRepository(Usuario);

        const where: FindConditions<Usuario> = {};

        if (query?.nome) {
            where.name = Raw((alias) => `${alias} ilike '%${query.nome}%'`);
        }

        if (query?.email) {
            where.email = Raw((alias) => `${alias} ilike '%${query.email}%'`);
        }

        const usuarios = await repo.find({
            relations: ["agentes"],
        });

        return usuarios;
    }
}
