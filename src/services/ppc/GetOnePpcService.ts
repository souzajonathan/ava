import { FindConditions, getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

export class GetOnePpcService {
    async execute(id?: string) {
        const repo = getRepository(Ppc);

        const where: FindConditions<Ppc> = {};

        if (id){
            where.id = id;
        }

        const ppc = await repo.findOne({
            relations: ["curso", "versoes", "perfis", "competencias"],
            where
        });

        return ppc;

    }

}