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
        
        if(!(await repo.findOne(id))){
            return new Error("Curso não existe!");
        }

        if(await repoPpc.findOne({where: {curso_id : id}})){
            return new Error("Curso com ppc's cadastrados");
        }

        await repo.delete(id);
    }
}