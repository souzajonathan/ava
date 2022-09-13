import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

export class GetOneTrilhaComponentesService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TrilhaComponentes);

        const trilha = await repo.findOne(id, {
            relations: ["trilha"],
        });

        if (!trilha) {
            return new Error("Trilha de componentes não existe!");
        }

        return trilha;
    }
}
