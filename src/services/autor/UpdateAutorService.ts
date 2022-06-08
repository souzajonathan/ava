import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Autor } from "../../entities/Autor";

type AutorUpdateRequest = {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    quote: string;
    nationality: string;
};

export class UpdateAutorService {
    async execute ({id, first_name, middle_name, last_name, quote, nationality}: AutorUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        
        const repo = getRepository(Autor);
        const autor = await repo.findOne(id);
        if (!autor) {
            return new Error("Autor não existe!");
        }

        autor.first_name = first_name ? first_name : autor.first_name;
        autor.middle_name = middle_name ? middle_name : autor.middle_name;
        autor.last_name = last_name ? last_name : autor.last_name;
        autor.quote = quote ? quote : autor.quote;
        autor.nationality = nationality ? nationality : autor.nationality;

        await repo.save(autor);

        return autor;
    }
}