import { getRepository } from "typeorm";
import { PerfilEgresso } from "../../entities/PerfilEgresso";

export class GetAllPerfisService {
    async execute() {
        const repo = getRepository(PerfilEgresso);

        const perfil = await repo.find();

        return perfil;
    }
}