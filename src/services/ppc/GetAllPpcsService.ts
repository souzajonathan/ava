import { FindConditions, getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

export class GetAllPpcsService {
    async execute(curso_id?: string) {
        const repo = getRepository(Ppc);

        const where: FindConditions<Ppc> = {}

        if (curso_id){
            where.curso_id = curso_id;
        }

        const ppc = await repo.find({
            relations: ["curso"],
            where
        });

        return ppc;
    }

}