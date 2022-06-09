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

        if(anoVoto){
            if(!Number.isInteger(anoVoto)){
                return new Error("Insira um número válido em 'ano voto'");
            }
        }

        if(horaCredito){
            if(!Number.isInteger(horaCredito)){
                return new Error("Insira um número válido em 'hora crédito'");
            }
        }

        if(quantSemestres){
            if(!Number.isInteger(quantSemestres)){
                return new Error("Insira um número válido em 'quantidade de semestres'");
            }
        }

        if(active){
            if(typeof active != "boolean"){
                return new Error("Marcação para 'PPC ativo' inválido");
            }
        }
        
        if(curso_id){
            if(!validate(curso_id)){
                return new Error("ID de curso inválido");
            }
        }
        
        const repo = getRepository(Ppc);
        const ppc = await repo.findOne(id);
        if (!ppc) {
            return new Error("PPC não existe!");
        }
        
        const repoCurso = getRepository(Curso);
        const curso = await repoCurso.findOne(curso_id);
        if (!curso) {
            return new Error("Curso não existe!");
        }
        
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
                return result;
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
                return result;
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