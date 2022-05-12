import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class GetAllPerfisService {
    async execute() {
        const repo = getRepository(PerfilEgresso);

        const perfis = await repo.find({
            relations: ["ppc"]
        });

        return perfis;
    }
}