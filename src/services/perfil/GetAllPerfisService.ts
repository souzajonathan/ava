import { getRepository } from "typeorm";
import { PerfisEgresso } from "../../entities/PerfisEgresso";

export class GetAllPerfisService {
    async execute() {
        const repo = getRepository(PerfisEgresso);

        const perfis = await repo.find({
            relations: ["ppc"]
        });

        return perfis;
    }
}