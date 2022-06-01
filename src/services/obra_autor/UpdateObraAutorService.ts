import { getRepository, In } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";
import { Obra } from "../../entities/Obra";
import { ObraAutor } from "../../entities/ObraAutor";

type ObraAutorUpdateRequest = {
    id: string;
    autor_id: string;
    obra_id: string;
    funcao: string;
};

export class UpdateObraAutorService {
    async execute ({id, autor_id, obra_id, funcao}: ObraAutorUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(ObraAutor);
        const repoAutor = getRepository(Autor);
        const repoObra = getRepository(Obra);

        const obraAutor = await repo.findOne(id);
        const autor = await repoAutor.findOne(autor_id);
        const obra = await repoObra.findOne(obra_id);


        if (!obraAutor) {
            return new Error("obra_autor não existente!");
        }

        if (!autor) {
            return new Error("Autor não existe!");
        }

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