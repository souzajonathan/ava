import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";
import { Ppc } from "../../entities/Ppc";

type CursoUpdateRequest = {
    id: string;
    name: string;
    ppc_ativo: string;
}

export class UpdateCursoService {
    async execute ({id, name, ppc_ativo}: CursoUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(Curso);
        const curso = await repo.findOne(id);
        if (!curso) {
            return new Error("Curso não existe!");
        }

        if(ppc_ativo){
            if(!validate(ppc_ativo)){
                return new Error("ID de ppc inválido");
            }
        }
        
        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_ativo);
        if (!ppc) {
            return new Error("ID de ppc inexistente");
        }
        
        curso.name = name ? name : curso.name;
        curso.ppc_ativo = ppc_ativo ? ppc_ativo : curso.ppc_ativo;

        await repo.save(curso);

        return{
            ...curso, ppc
        };
    }
}