import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

export class GetOnePpcService {
    async execute(id: string) {
        const repo = getRepository(Ppc);

        const ppc = await repo.findOne(id, {
            relations: ["curso", "versoesPdv", "perfis", "competencias"]
        });

        if (!ppc) {
            return new Error("PPC não existe!");
        }

        return ppc;
    }

}