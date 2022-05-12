import { FindConditions, getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";

export class GetOneDisciplinaService {
    async execute(id?: string) {
        const repo = getRepository(Disciplina);

        const where: FindConditions<Disciplina> = {};

        if (id){
            where.id = id;
        }

        const disciplina = await repo.find({
            relations: ["area", "versoes"],
            where
        });

        return disciplina;
    }

}