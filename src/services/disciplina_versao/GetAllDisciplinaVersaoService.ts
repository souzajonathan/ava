import { getRepository } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetAllDisciplinaVersoesService {
    async execute() {
        const repo = getRepository(DisciplinaVersao);

        const versoes = await repo.find({
            relations: ["disciplina"]
        });

        return versoes;
    }

}