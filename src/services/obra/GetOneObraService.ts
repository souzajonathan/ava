import { getRepository } from "typeorm";
import { validate} from "uuid";
import { Obra } from "../../entities/Obra";

export class GetOneObraService {
    async execute(id: string) {

        if (!validate(id)){
            return new Error("ID inválido");
        }

        const repo = getRepository(Obra);
        
        const obra = await repo.findOne(id, {
            relations: ["bibliografias", "obrasAutores"],
        });

        if (!obra) {
            return new Error("Obra não existe!");
        }

        return obra;
    }

}