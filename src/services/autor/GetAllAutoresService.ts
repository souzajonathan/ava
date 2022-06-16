import { FindConditions, getRepository, Raw } from "typeorm";
import { Autor } from "../../entities/Autor";

type filter = {
    primeiroNome?: string;
    ultimoNome?: string;
    nacionalidade?: string;
    citacao?: string;
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

        if (query?.nacionalidade) {
            where.nationality = Raw((alias) => `${alias} ilike '%${query.nacionalidade}%'`);
        }

        if (query?.citacao) {
            where.quote = Raw((alias) => `${alias} ilike '%${query.citacao}%'`);
        }

        const autores = await repo.find({
            relations: ["obrasAutores"],
            where
        });

        return autores;
    }
}