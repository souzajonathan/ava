import { isBoolean, isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Curso } from "../../entities/Curso";
import { Instituicao } from "../../entities/Instituicao";
import { Ppc } from "../../entities/Ppc";
import { CreateCompetenciaService } from "../competencia/CreateCompetenciaService";
import { CreatePerfilService } from "../perfil/CreatePerfilService";

type Competencia = {
    competencia: string;
    competenciaNumero: number;
};

type Perfil = {
    perfil: string;
    perfilNumero: number;
};

type PpcRequest = {
    curso_id: string;
    anoVoto: number;
    dataInicio: string;
    dataFim: string;
    horaCredito: number;
    quantSemestres: number;
    active: boolean;
    ppc_ativo: boolean;
    competencias?: Competencia[];
    perfis?: Perfil[];
    instituicao_id: string;
};

export class CreatePpcService {
    async execute({
        curso_id,
        anoVoto,
        dataInicio,
        dataFim,
        horaCredito,
        quantSemestres,
        ppc_ativo,
        active,
        competencias,
        perfis,
        instituicao_id,
    }: PpcRequest) {
        if (!validate(curso_id)) {
            return new Error("ID de curso inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!dataInicio) {
            return new Error("Data de início é obrigatória");
        }

        if (!isInt(anoVoto) || isNegative(anoVoto)) {
            return new Error("Insira um número válido em 'ano voto'");
        }

        if (!isInt(horaCredito) || isNegative(horaCredito)) {
            return new Error("Insira um número válido em 'hora crédito'");
        }

        if (!isInt(quantSemestres) || isNegative(quantSemestres)) {
            return new Error(
                "Insira um número válido em 'quantidade de semestres'"
            );
        }

        if (!isBoolean(active)) {
            return new Error("Marcação para 'PPC atual' inválido");
        }

        if (!isBoolean(ppc_ativo)) {
            return new Error("Marcação para 'PPC ativo' inválido");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repoCurso = getRepository(Curso);
        const curso = await repoCurso.findOne(curso_id);
        if (!curso) {
            return new Error("Curso não existe!");
        }

        const repo = getRepository(Ppc);
        const ppc = repo.create({
            curso_id,
            anoVoto,
            dataInicio,
            dataFim,
            horaCredito,
            quantSemestres,
            ppc_ativo,
            instituicao_id,
        });
        await repo.save(ppc);

        if (active) {
            curso.ppc_ativo = ppc.id;
            await repoCurso.save(curso);
        }

        if (competencias.length) {
            for await (const competencia of competencias) {
                const service = new CreateCompetenciaService();

                const result = await service.execute({
                    ppc_id: ppc.id,
                    competencia: competencia.competencia,
                    competenciaNumero: competencia.competenciaNumero,
                    instituicao_id: instituicao_id,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        if (perfis.length) {
            for await (const perfil of perfis) {
                const service = new CreatePerfilService();

                const result = await service.execute({
                    ppc_id: ppc.id,
                    perfil: perfil.perfil,
                    perfilNumero: perfil.perfilNumero,
                    instituicao_id: instituicao_id,
                });

                if (result instanceof Error) {
                    return result;
                }
            }
        }

        return {
            ...ppc,
            curso,
        };
    }
}
