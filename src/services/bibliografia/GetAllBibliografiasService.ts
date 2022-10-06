import { getRepository } from "typeorm";
import { Bibliografia } from "../../entities/Bibliografia";

export class GetAllBibliografiasService {
    async execute() {
        const repo = getRepository(Bibliografia);

        const bibliografias = await repo.find({
            relations: ["versao", "obra"],
        });

        return bibliografias;
    }
}
