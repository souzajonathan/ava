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
        if(!curso_id || !anoVoto || !dataInicio || !dataFim || !horaCredito || !quantSemestres){
            return new Error("É necessário preencher os campos obrigatórios");
        }
        
        if(!Number.isInteger(anoVoto)){
            return new Error("Insira um número válido em 'ano voto'");
        }

        if(!Number.isInteger(horaCredito)){
            return new Error("Insira um número válido em 'hora crédito'");
        }

        if(!Number.isInteger(quantSemestres)){
            return new Error("Insira um número válido em 'quantidade de semestres'");
        }

        if(typeof active != "boolean"){
            return new Error("Marcação para 'PPC ativo' inválido");
        }
        
        if(!validate(curso_id)){
            return new Error("ID de curso inválido");
        }

        const repoCurso = getRepository(Curso);
        const curso = await repoCurso.findOne(curso_id);
        if(!curso) {
            return new Error("Curso não existe!");
        }
        
        const repo = getRepository(Ppc);
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

        return {
            ...ppc, curso
        };
    }
}