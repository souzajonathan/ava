import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";
import { Ppc } from "../../entities/Ppc";

type CursoUpdateRequest = {
    id: string;
    name: string;
    ppc_ativo: string;
    active: boolean;
};

export class UpdateCursoService {
    async execute({ id, name, ppc_ativo, active }: CursoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (active && typeof active != "boolean") {
            return new Error("Marcação para 'active' inválida");
        }

        if (ppc_ativo && !validate(ppc_ativo)) {
            return new Error("ID de ppc inválido");
        }

        const repo = getRepository(Curso);
        const curso = await repo.findOne(id);
        if (!curso) {
            return new Error("Curso não existe!");
        }

        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_ativo);
        if (ppc_ativo && !ppc) {
            return new Error("ID de ppc inexistente");
        }

        curso.name = name ? name : curso.name;
        curso.ppc_ativo = ppc_ativo ? ppc_ativo : curso.ppc_ativo;
        if (active != undefined && active != null) {
            curso.active = active;
        }

        await repo.save(curso);

        console.log(typeof active);
        console.log(active);
        return {
            ...curso,
            ppc,
        };
    }
}
