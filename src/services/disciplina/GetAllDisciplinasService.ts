import { getRepository } from "typeorm";
import { Disciplina } from "../../entities/Disciplina";

export class GetAllDisciplinasService {
    async execute() {
        const repo = getRepository(Disciplina);

        const disciplinas = await repo.find({
            relations: ["area"]
        });

        return disciplinas;
    }

}