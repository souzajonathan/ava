import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";
import { Ppc } from "../../entities/Ppc";

type PpcUpdateRequest = {
    id: string;
    curso_id: string;
    anoVoto: number;
    dataInicio: string;
    dataFim: string;
    horaCredito: number;
    quantSemestres: number;
};

export class UpdatePpcService {
    async execute ({id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres, curso_id}: PpcUpdateRequest) {
        const repo = getRepository(Ppc);
        const repoCurso = getRepository(Curso);

        const ppc = await repo.findOne(id);
        const curso = await repoCurso.findOne(curso_id);

        if (!ppc) {
            return new Error("PPC não existe!");
        }

        if (!curso) {
            return new Error("Curso não existe!");
        }

        ppc.anoVoto = anoVoto ? anoVoto : ppc.anoVoto;
        ppc.dataInicio = dataInicio ? dataInicio : ppc.dataInicio;
        ppc.dataFim = dataFim ? dataFim : ppc.dataFim;
        ppc.horaCredito = horaCredito ? horaCredito : ppc.horaCredito;
        ppc.quantSemestres = quantSemestres ? quantSemestres : ppc.quantSemestres;
        ppc.curso_id = curso_id ? curso_id : ppc.curso_id;

        await repo.save(ppc);

        return {
            ...ppc, curso
        }
    }
}