import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Obra } from "../../entities/Obra";

export class DeleteObraService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(Obra);
        const obra = await repo.findOne(id, {
            relations: ["bibliografias", "obrasAutores"]
        });
        
        if(!obra){
            return new Error("Obra não existe!");
        }

        if(obra.bibliografias.length > 0){
            return new Error("Obra com bibliografias cadastradas");
        }

        if(obra.obrasAutores.length > 0){
            return new Error("Obra com autores cadastrados");
        }

        await repo.delete(id);
    }
}