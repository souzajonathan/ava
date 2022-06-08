import { getRepository } from "typeorm";
import { Autor } from "../../entities/Autor";

type AutorRequest = {
    first_name: string;
    middle_name: string;
    last_name: string;
    quote: string;
    nationality: string;
};

export class CreateAutorService {
    async execute({ first_name, middle_name, last_name, quote, nationality }: AutorRequest): Promise< Autor | Error > {
        if(!quote){
            return new Error("Citação é obrigatória");
        }
        
        const repo = getRepository(Autor);

        const autor = repo.create({
            first_name,
            middle_name,
            last_name,
            quote,
            nationality
        });

        await repo.save(autor);

        return autor;
    }

}