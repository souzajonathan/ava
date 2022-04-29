import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";
import { Ppc } from "../../entities/Ppc";


type PpcRequest = {
    curso_id: string;
    anoVoto: number;
    dataInicio: string;
    dataFim: string;
    horaCredito: number;
    quantSemestres: number;
}

export class CreatePpcService {
    async execute ({curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres}: PpcRequest) {
        const repo = getRepository(Ppc);
        const repoCurso = getRepository(Curso);

        const curso = await repoCurso.findOne(curso_id)

        if(!curso) {
            return new Error("Curso não existe!");
        }

        const ppc = repo.create({curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres});
        
        await repo.save(ppc);

        return {
            ...ppc, curso
        }
    }
}