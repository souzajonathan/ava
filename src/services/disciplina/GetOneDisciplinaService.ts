import { getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";

export class GetOneDisciplinaService {
    async execute(id: string) {
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