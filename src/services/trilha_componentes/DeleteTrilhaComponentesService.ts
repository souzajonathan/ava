import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

export class DeleteTrilhaComponentesService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TrilhaComponentes);
        const trilha = await repo.findOne(id, {
            relations: ["trilhaComponentes"],
        });

        if (!trilha) {
            return new Error("Trilha de componentes não existe!");
        }

        if (trilha.trilhaComponentes.length > 0) {
            return new Error(
                "Trilha de componentes com componentes cadastrados"
            );
        }

        await repo.delete(id);
    }
}
