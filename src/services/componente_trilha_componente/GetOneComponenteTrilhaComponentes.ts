import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";

export class GetOneComponenteTrilhaComponentesService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesTrilhaComponentes);

        const componenteTrilhaComponentes = await repo.findOne(id, {
            relations: ["tipos", "trilha"],
        });

        if (!componenteTrilhaComponentes) {
            return new Error("componenteTrilhaComponentes não existe!");
        }

        return componenteTrilhaComponentes;
    }
}
