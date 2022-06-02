import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";
import { ObraAutor } from "../../entities/ObraAutor";

export class DeleteAutorService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Autor);
        const autor = await repo.findOne(id);
        
        if(!autor){
            return new Error("Autor não existe!");
        }

        const repoObraAutor = getRepository(ObraAutor);
        const obraWithObraAutor = await repoObraAutor.findOne({where: {autor_id : id}});

        if(obraWithObraAutor){
            return new Error("Autor com obras cadastradas");
        }

        await repo.delete(id);
    }
}