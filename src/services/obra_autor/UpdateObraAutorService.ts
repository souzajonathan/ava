import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";
import { Obra } from "../../entities/Obra";
import { ObraAutor } from "../../entities/ObraAutor";

type ObraAutorUpdateRequest = {
    id: string;
    autor_id: string;
    obra_id: string;
    funcao: string;
}

export class UpdateObraAutorService {
    async execute ({id, autor_id, obra_id, funcao}: ObraAutorUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }

        if(autor_id){
            if(!validate(autor_id)){
                return new Error("ID de autor inválido");
            }
        }
        
        if(obra_id){
            if(!validate(obra_id)){
                return new Error("ID de obra inválido");
            }
        }
        
        const repo = getRepository(ObraAutor);
        const obraAutor = await repo.findOne(id);
        if (!obraAutor) {
            return new Error("obra_autor não existente!");
        }

        const repoAutor = getRepository(Autor);
        const autor = await repoAutor.findOne(autor_id);
        if (!autor) {
            return new Error("Autor não existe!");
        }
        
        const repoObra = getRepository(Obra);
        const obra = await repoObra.findOne(obra_id);
        if (!obra) {
            return new Error("Obra não existe!");
        }

        obraAutor.autor_id = autor_id ? autor_id : obraAutor.autor_id;
        obraAutor.obra_id = obra_id ? obra_id : obraAutor.obra_id;
        obraAutor.funcao = funcao ? funcao : obraAutor.funcao;

        await repo.save(obraAutor);

        return {
            ...obraAutor, autor, obra
        };
    }
}