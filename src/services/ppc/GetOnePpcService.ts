import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";
import { validate} from "uuid";

export class GetOnePpcService {
    async execute(id: string) {

        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Ppc);

        const ppc = await repo.findOne(id, {
            relations: ["curso", "ppcDisciplinaVersoes", "perfis", "competencias"]
        });

        if (!ppc) {
            return new Error("PPC não existe!");
        }

        return ppc;
    }

}