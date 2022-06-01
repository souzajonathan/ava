import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Disciplina } from "../../entities/Disciplina";

export class GetOneDisciplinaService {
    async execute(id: string) {

        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Disciplina);

        const disciplina = await repo.findOne(id, {
            relations: ["area", "versoes"]
        });

        if (!disciplina) {
            return new Error("Disciplina não existe!");
        }

        return disciplina;
    }

}