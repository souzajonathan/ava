import { getRepository } from "typeorm";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";

export class GetAllComponentesTrilhasComponentesService {
    async execute() {
        const repo = getRepository(ComponentesTrilhaComponentes);

        const componentesTrilhaComponentes = await repo.find({
            relations: ["trilha", "tipos"],
        });

        return componentesTrilhaComponentes;
    }
}
