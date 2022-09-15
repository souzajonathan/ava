import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";

type ComponenteTrilhaComponentesRequest = {
    tipo_componente_id: string;
    trilha_componentes_id: string;
    observacao: string;
    item_interno: boolean;
};

export class CreateComponenteTrilhaComponentesService {
    async execute({
        tipo_componente_id,
        trilha_componentes_id,
        observacao,
        item_interno,
    }: ComponenteTrilhaComponentesRequest) {
        if (!validate(tipo_componente_id)) {
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
            tipo_componente_id,
            trilha_componentes_id,
            observacao,
            item_interno,
        });

        await repo.save(componenteTrilhaComponente);

        return componenteTrilhaComponente;
    }
}
