import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

export class GetAllPpcsService {
    async execute() {
        const repo = getRepository(Ppc);

        const ppc = await repo.find({
            relations: ["curso"]
        });

        return ppc;
    }

}