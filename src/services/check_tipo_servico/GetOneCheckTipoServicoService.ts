import { getRepository } from "typeorm";
import { validate } from "uuid";
import { CheckTipoServico } from "../../entities/CheckTipoServico";

export class GetOneCheckTipoServicoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(CheckTipoServico);

        const checkTipoServico = await repo.findOne(id, {
            relations: ["tipoServico", "tipoComponente", "listasCheck"],
        });

        if (!checkTipoServico) {
            return new Error("Check de tipo de serviço não existe!");
        }

        return checkTipoServico;
    }
}
