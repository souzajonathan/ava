import { FindConditions, getRepository, Raw } from "typeorm";
import { ObraAutor } from "../../entities/ObraAutor";

type filter = {
    func?: string;
};

export class GetAllObraAutorService {
    async execute(query?: filter) {
        const repo = getRepository(ObraAutor);

        const where: FindConditions<ObraAutor> = {};

        if (query?.func) {
            where.funcao = Raw((alias) => `${alias} ilike '%${query.func}%'`);
        }

        const obraAutor = await repo.find({
            relations: ["autor", "obra"],
        });

        return obraAutor;
    }
}
