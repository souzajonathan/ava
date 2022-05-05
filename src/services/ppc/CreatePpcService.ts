import { response } from "express";
import { getRepository } from "typeorm";
import { Curso } from "../../entities/Curso";
import { Ppc } from "../../entities/Ppc";
import { CreateCompetenciaService } from "../competencia/CreateCompetenciaService";
import { CreatePerfilService } from "../perfil/CreatePerfilService";

type Competencia = {
    competencia: string;
    competenciaNumero: string;
};

type Perfil = {
    perfil: string;
    perfilNumero: string;
};

type PpcRequest = {
    curso_id: string;
    anoVoto: number;
    dataInicio: string;
    dataFim: string;
    horaCredito: number;
    quantSemestres: number;
    active: boolean;
    competencias: Competencia[];
    perfis: Perfil[];
}

export class CreatePpcService {
    async execute ({curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres, active, competencias, perfis}: PpcRequest) {
        const repo = getRepository(Ppc);
        const repoCurso = getRepository(Curso);

        const curso = await repoCurso.findOne(curso_id);

        if(!curso) {
            return new Error("Curso não existe!");
        }

        const ppc = repo.create({curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres});
        
        await repo.save(ppc);

        if(active){
            curso.ppcAtivo = ppc.id;
            await repoCurso.save(curso);
        }

        for await (const competencia of competencias) {

            const service = new CreateCompetenciaService();

            const result = await service.execute({
                ppc_id: ppc.id,
                competencia: competencia.competencia,
                competenciaNumero: competencia.competenciaNumero
            });

            if (result instanceof Error) {
                return response.status(400).json(result.message);
            }
        
        }

        for await (const perfil of perfis) {
            
            const service = new CreatePerfilService();

            const result = await service.execute({
                ppc_id: ppc.id,
                perfil: perfil.perfil,
                perfilNumero: perfil.perfilNumero
            });

            if (result instanceof Error) {
                return response.status(400).json(result.message);
            }
        }

        return {
            ...ppc, curso
        }
    }
}