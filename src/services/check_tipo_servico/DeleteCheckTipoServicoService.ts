import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CheckTipoServico } from "../../entities/CheckTipoServico";

export class DeleteCheckTipoServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(CheckTipoServico);
        const checkTipoServico = await repo.findOne(id, {
            relations: ["listasCheck"],
        });

        if (!checkTipoServico) {
            return new Error("Check de tipo de serviço não existe!");
        }

        if (!checkTipoServico.listasCheck.length) {
            return new Error(
                "Check de tipo de serviço com lista(s) de check de serviço cadastrada(s)!"
            );
        }

        await repo.delete(id);
    }
}
