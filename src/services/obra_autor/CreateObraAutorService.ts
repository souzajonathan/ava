import { getRepository, In } from "typeorm";
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
        if (!validate(autor_id) && !validate(obra_id)){
            return new Error("ID's inválidos");
        }
        const repo = getRepository(ObraAutor);
        const repoAutor = getRepository(Autor);
        const repoObra = getRepository(Obra);

        const autor = await repoAutor.findOne(autor_id);
        const obra = await repoObra.findOne(obra_id);

        if(!autor) {
            return new Error("Autor não existe!");
        }
        
        if(!obra) {
            return new Error("Obra não existe!");
        }

        const obraAutor = repo.create({autor_id, obra_id, funcao});

        await repo.save(obraAutor);

        return {
            ...obraAutor, autor, obra
        };
    }
}