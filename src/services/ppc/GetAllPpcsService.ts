import { FindConditions, getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

export class GetAllPpcsService {
    async execute(curso_id?: string) {
        const repo = getRepository(Ppc);

        const where: FindConditions<Ppc> = {};

        if (curso_id){
            where.curso_id = curso_id;
        }

        const ppcs = await repo.find({
            relations: ["curso", "versoesPdv", "perfis", "competencias"],
            where
        });

        return ppcs;
    }

}