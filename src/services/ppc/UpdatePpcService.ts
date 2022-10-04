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

type PpcUpdateRequest = {
    id: string;
    curso_id: string;
    anoVoto: number;
    dataInicio: string;
    dataFim: string;
    horaCredito: number;
    quantSemestres: number;
    ppc_ativo: boolean;
    active: boolean;
    competencias: Competencia[];
    perfis: Perfil[];
    instituicao_id: string;
};

export class UpdatePpcService {
    async execute({
        id,
        anoVoto,
        dataInicio,
        dataFim,
        horaCredito,
        quantSemestres,
        curso_id,
        ppc_ativo,
        active,
        competencias,
        perfis,
        instituicao_id,
    }: PpcUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (anoVoto && !Number.isInteger(anoVoto)) {
            return new Error("Insira um número válido em 'ano voto'");
        }

        if (horaCredito && !Number.isInteger(horaCredito)) {
            return new Error("Insira um número válido em 'hora crédito'");
        }

        if (quantSemestres && !Number.isInteger(quantSemestres)) {
            return new Error(
                "Insira um número válido em 'quantidade de semestres'"
            );
        }

        if (ppc_ativo) {
            if (typeof ppc_ativo != "boolean") {
                return new Error("Marcação para 'PPC ativo' inválido");
            }
        }

        if (active) {
            if (typeof active != "boolean") {
                return new Error("Marcação para 'PPC atual' inválido");
            }
        }

        if (curso_id && !validate(curso_id)) {
            return new Error("ID de curso inválido");
        }

        if (instituicao_id && !validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
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

        if (active) {
            curso.ppc_ativo = ppc.id;
            await repoCurso.save(curso);
        }

        if (competencias) {
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

        if (perfis) {
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

        ppc.anoVoto = anoVoto ? anoVoto : ppc.anoVoto;
        ppc.dataInicio = dataInicio ? dataInicio : ppc.dataInicio;
        ppc.dataFim = dataFim ? dataFim : ppc.dataFim;
        ppc.horaCredito = horaCredito ? horaCredito : ppc.horaCredito;
        ppc.quantSemestres = quantSemestres
            ? quantSemestres
            : ppc.quantSemestres;
        if (ppc_ativo != undefined && ppc_ativo != null) {
            ppc.ppc_ativo = ppc_ativo;
        }
        ppc.curso_id = curso_id ? curso_id : ppc.curso_id;
        ppc.instituicao_id = instituicao_id
            ? instituicao_id
            : ppc.instituicao_id;

        await repo.save(ppc);

        return {
            ...ppc,
            curso,
        };
    }
}
