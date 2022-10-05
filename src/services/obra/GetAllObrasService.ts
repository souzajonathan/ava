import { FindConditions, getRepository, Raw } from "typeorm";
import { Obra } from "../../entities/Obra";

type filter = {
    obra_nome?: string;
    serie_nome?: string;
    editora?: string;
    periodico_nome?: string;
    periodico_abreviacao?: string;
};

export class GetAllObrasService {
    async execute(query?: filter) {
        const repo = getRepository(Obra);

        const where: FindConditions<Obra> = {};

        if (query?.obra_nome) {
            where.obra_nome = Raw(
                (alias) => `${alias} ilike '%${query.obra_nome}%'`
            );
        }

        if (query?.serie_nome) {
            where.serie_nome = Raw(
                (alias) => `${alias} ilike '%${query.serie_nome}%'`
            );
        }

        if (query?.editora) {
            where.editora = Raw(
                (alias) => `${alias} ilike '%${query.editora}%'`
            );
        }

        if (query?.periodico_nome) {
            where.periodico_nome = Raw(
                (alias) => `${alias} ilike '%${query.periodico_nome}%'`
            );
        }

        if (query?.periodico_abreviacao) {
            where.periodico_abreviacao = Raw(
                (alias) => `${alias} ilike '%${query.periodico_abreviacao}%'`
            );
        }

        const obras = await repo.find({
            relations: [
                "bibliografias",
                "obrasAutores",
                "obraChildren",
                "obraParent",
                "obrasAutores.autores",
            ],
            where,
        });

        return obras;
    }
}
