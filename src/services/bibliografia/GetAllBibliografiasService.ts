import { getRepository } from "typeorm";
import { Bibliografia } from "../../entities/Bibliografia";

export class GetAllBibliografiasService {
    async execute() {
        const repo = getRepository(Bibliografia);

        const bibliografias = await repo.find({
            relations: ["versoes", "obras"]
        });

        return bibliografias;
    }
}