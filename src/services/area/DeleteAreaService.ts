import { getRepository } from "typeorm";
import { Area } from "../../entities/Area";
import { Disciplina } from "../../entities/Disciplina";

export class DeleteAreaService {
    async execute(id: string) {
        const repo = getRepository(Area);
        const repoDisciplina = getRepository(Disciplina);
        
        if(!(await repo.findOne(id))){
            return new Error("Área não existe!");
        }

        if(await repoDisciplina.findOne({where: {area_id : id}})){
            return new Error("Área com disciplinas cadastradas");
        }

        await repo.delete(id);
    }
}