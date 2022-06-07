import { response } from "express";
import { getRepository } from "typeorm";
import { validate } from "uuid";
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

type PpcUpdateRequest = {
    id: string;
    curso_id: string;
    anoVoto: number;
    dataInicio: string;
    dataFim: string;
    horaCredito: number;
    quantSemestres: number;
    active: boolean;
    competencias: Competencia[];
    perfis: Perfil[];
};

export class UpdatePpcService {
    async execute ({id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres, curso_id, active, competencias, perfis}: PpcUpdateRequest) {
        if (!validate(id)){
            return new Error("ID inválido");
        }
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

        if(active){
            curso.ppcAtivo = ppc.id;
            await repoCurso.save(curso);
        }
        else{
            curso.ppcAtivo = null;
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