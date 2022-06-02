import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Bibliografia } from "../../entities/Bibliografia";
import { Obra } from "../../entities/Obra";
import { ObraAutor } from "../../entities/ObraAutor";

export class DeleteObraService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Obra);
        const obra = await repo.findOne(id);
        
        if(!obra){
            return new Error("Obra não existe!");
        }

        const repoBibliografia = getRepository(Bibliografia);
        const obraWithBibliografias = await repoBibliografia.findOne({where: {obra_id : id}});

        if(obraWithBibliografias){
            return new Error("Obra com bibliografias cadastradas");
        }

        const repoObraAutor = getRepository(ObraAutor);
        const obraWithObraAutor = await repoObraAutor.findOne({where: {obra_id : id}});

        if(obraWithObraAutor){
            return new Error("Obra com autores cadastrados");
        }

        await repo.delete(id);
    }
}