import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Area } from "../../entities/Area";
import { Disciplina } from "../../entities/Disciplina";

export class DeleteAreaService {
    async execute(id: string) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
        const repo = getRepository(Area);
        const repoDisciplina = getRepository(Disciplina);
        const area = await repo.findOne(id);
        
        if(!area){
            return new Error("Área não existe!");
        }

        const areaWithDisciplinas = await repoDisciplina.findOne({where: {area_id : id}});

        if(areaWithDisciplinas){
            return new Error("Área com disciplinas cadastradas");
        }

        await repo.delete(id);
    }
}