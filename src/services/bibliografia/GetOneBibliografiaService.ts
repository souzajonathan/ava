import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Bibliografia } from "../../entities/Bibliografia";

export class GetOneBibliografiaService {
    async execute(id: string) {

        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Bibliografia);

        const bibliografia = await repo.findOne(id, {
            relations: ["versoes", "obras"]
        });

        if (!bibliografia) {
            return new Error("Bibliografia não existe!");
        }

        return bibliografia;
    }
}