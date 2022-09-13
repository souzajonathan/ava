import { getRepository } from "typeorm";
import { validate } from "uuid";
import { ComponentesTrilhaComponentes } from "../../entities/ComponentesTrilhaComponente";
import { TiposComponentes } from "../../entities/TiposComponentes";
import { TrilhaComponentes } from "../../entities/TrilhaComponentes";

type ComponenteTrilhaComponentesUpdateRequest = {
    id: string;
    tipos_componentes_id: string;
    trilha_componentes_id: string;
    observacao: string;
    item_interno: boolean;
};

export class UpdateComponenteTrilhaComponentesService {
    async execute({
        id,
        tipos_componentes_id,
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

        if (tipos_componentes_id && !validate(tipos_componentes_id)) {
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
            tipos_componentes_id
        );
        if (!tipoComponente) {
            return new Error("Tipo de componente não existe!");
        }

        componenteTrilhaComponentes.tipos_componentes_id = tipos_componentes_id
            ? tipos_componentes_id
            : componenteTrilhaComponentes.tipos_componentes_id;
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
