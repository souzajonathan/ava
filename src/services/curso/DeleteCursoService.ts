import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";

export class DeleteCursoService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(Curso);
        const curso = await repo.findOne(id, {
            relations: ["ppcs"]
        });
        
        if(!curso){
            return new Error("Curso não existe!");
        }

        if(curso.ppcs.length > 0){
            return new Error("Curso com ppc's cadastrados");
        }

        await repo.delete(id);
    }
}