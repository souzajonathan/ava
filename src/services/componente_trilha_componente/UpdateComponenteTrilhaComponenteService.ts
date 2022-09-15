import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

type ComponenteTrilhaComponentesUpdateRequest = {
    id: string;
    tipo_componente_id: string;
    trilha_componentes_id: string;
    observacao: string;
    item_interno: boolean;
};

export class UpdateComponenteTrilhaComponentesService {
    async execute({
        id,
        tipo_componente_id,
        trilha_componentes_id,
        observacao,
        item_interno,
    }: ComponenteTrilhaComponentesUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(ComponentesTrilhaComponentes);
        const componenteTrilhaComponentes = await repo.findOne(id);
        if (!componenteTrilhaComponentes) {
            return new Error("componentes_trilha_componentes não existe!");
        }

        if (tipo_componente_id && !validate(tipo_componente_id)) {
            return new Error("ID de tipo de componente inválido");
        }

        if (trilha_componentes_id && !validate(trilha_componentes_id)) {
            return new Error("ID de trilha de componentes inválido");
        }

        if (item_interno && typeof item_interno != "boolean") {
            return new Error("Marcação para 'item interno' inválida");
        }

        const repoTrilhaComponentes = getRepository(TrilhaComponentes);
        const trilhaComponentes = await repoTrilhaComponentes.findOne(
            trilha_componentes_id
        );
        if (!trilhaComponentes) {
            return new Error("Trilha de componentes não existe!");
        }

        const repoTipoComponente = getRepository(TiposComponentes);
        const tipoComponente = await repoTipoComponente.findOne(
            tipo_componente_id
        );
        if (!tipoComponente) {
            return new Error("Tipo de componente não existe!");
        }

        componenteTrilhaComponentes.tipo_componente_id = tipo_componente_id
            ? tipo_componente_id
            : componenteTrilhaComponentes.tipo_componente_id;
        componenteTrilhaComponentes.trilha_componentes_id =
            trilha_componentes_id
                ? trilha_componentes_id
                : componenteTrilhaComponentes.trilha_componentes_id;
        componenteTrilhaComponentes.observacao = observacao
            ? observacao
            : componenteTrilhaComponentes.observacao;
        componenteTrilhaComponentes.item_interno = item_interno
            ? item_interno
            : componenteTrilhaComponentes.item_interno;

        await repo.save(componenteTrilhaComponentes);

        return componenteTrilhaComponentes;
    }
}
