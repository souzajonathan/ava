import { getRepository } from "typeorm";
import { validate} from "uuid";
import { Autor } from "../../entities/Autor";

export class GetOneAutorService {
    async execute(id: string) {

        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Autor);
        
        const autor = await repo.findOne(id, {
            relations: ["obrasAutores"]
        });

        if (!autor) {
            return new Error("Autor não existe!");
        }

        return autor;
    }

}