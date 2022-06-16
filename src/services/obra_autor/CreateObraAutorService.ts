import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";
import { Obra } from "../../entities/Obra";
import { ObraAutor } from "../../entities/ObraAutor";

type ObraAutorRequest = {
    autor_id: string;
    obra_id: string;
    funcao: string;
}

export class CreateObraAutorService {
    async execute ({autor_id, obra_id, funcao}: ObraAutorRequest) {
        if (!validate(autor_id)){
            return new Error("ID de autor inválido");
        }

        if (!validate(obra_id)){
            return new Error("ID de obra inválido");
        }

        if(!funcao){
            return new Error("Função não inserida");
        }

        const repoAutor = getRepository(Autor);
        const autor = await repoAutor.findOne(autor_id);
        if(!autor) {
            return new Error("Autor não existe!");
        }

        const repoObra = getRepository(Obra);
        const obra = await repoObra.findOne(obra_id);       
        if(!obra) {
            return new Error("Obra não existe!");
        }
        
        const repo = getRepository(ObraAutor);
        const obraAutor = repo.create({autor_id, obra_id, funcao});
        await repo.save(obraAutor);

        return {
            ...obraAutor, autor, obra
        };
    }
}