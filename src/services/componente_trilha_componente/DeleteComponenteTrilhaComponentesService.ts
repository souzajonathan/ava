import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";

export class DeleteComponenteTrilhaComponentesService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesTrilhaComponentes);
        const componenteTrilhaComponentes = await repo.findOne(id);

        if (!componenteTrilhaComponentes) {
            return new Error("componenteTrilhaComponentes não existente!");
        }

        await repo.delete(id);
    }
}
