import { FindConditions, getRepository, Raw } from "typeorm";
import { Autor } from "../../entities/Autor";

type filter = {
    primeiroNome?: string;
    ultimoNome?: string;
}

export class GetAllAutoresService {
    async execute(query?:filter) {
        const repo = getRepository(Autor);

        const where: FindConditions<Autor> = {};

        if (query?.primeiroNome) {
            where.first_name = Raw((alias) => `${alias} ilike '%${query.primeiroNome}%'`);
        }

        if (query?.ultimoNome) {
            where.last_name = Raw((alias) => `${alias} ilike '%${query.ultimoNome}%'`);
        }

        const autores = await repo.find({
            where
        });

        return autores;
    }
}