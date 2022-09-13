import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";

type ComponenteTrilhaComponentesRequest = {
    tipos_componentes_id: string;
    trilha_componentes_id: string;
    observacao: string;
    item_interno: boolean;
};

export class CreateComponenteTrilhaComponentesService {
    async execute({
        tipos_componentes_id,
        trilha_componentes_id,
        observacao,
        item_interno,
    }: ComponenteTrilhaComponentesRequest) {
        if (!validate(tipos_componentes_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (!validate(trilha_componentes_id)) {
            return new Error("ID de trilha de componentes inválido");
        }

        if (typeof item_interno != "boolean") {
            return new Error("Marcação para 'item interno' inválida");
        }

        const repo = getRepository(ComponentesTrilhaComponentes);
        const componenteTrilhaComponente = repo.create({
            tipos_componentes_id,
            trilha_componentes_id,
            observacao,
            item_interno,
        });

        await repo.save(componenteTrilhaComponente);

        return componenteTrilhaComponente;
    }
}
