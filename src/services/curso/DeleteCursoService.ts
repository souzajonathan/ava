import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";
import { Ppc } from "../../entities/Ppc";

export class DeleteCursoService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Curso);
        const repoPpc = getRepository(Ppc);
        const curso = await repo.findOne(id);
        
        if(!curso){
            return new Error("Curso não existe!");
        }

        const cursoWithPpcs = await repoPpc.findOne({where: {curso_id : id}});

        if(cursoWithPpcs){
            return new Error("Curso com ppc's cadastrados");
        }

        await repo.delete(id);
    }
}