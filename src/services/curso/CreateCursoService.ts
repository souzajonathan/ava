import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";

type CursoRequest = {
    name: string;
}

export class CreateCursoService {
    async execute({ name }: CursoRequest): Promise<Curso | Error> {
        if(!name){
            return new Error("Nome de curso não inserido");
        }
        
        const repo = getRepository(Curso);

        const cursoAlreadyExists = await repo.findOne({name});
        if(cursoAlreadyExists) {
            return new Error("Curso já existe");
        }

        const curso = repo.create({
            name
        });

        await repo.save(curso);

        return curso;
    }
}