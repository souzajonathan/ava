import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

type CursoRequest = {
    name: string;
    pccAtivo: string;
};

export class CreateCursoService {
    async execute({ name, pccAtivo }: CursoRequest): Promise<Curso | Error> {
        const repo = getRepository(Curso);

        if(await repo.findOne({name})) {
            return new Error("Curso já existe");
        }

        const curso = repo.create({
            name,
            pccAtivo
        });

        await repo.save(curso);

        return curso;
    }

}