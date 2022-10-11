import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Agente } from "../../entities/Agente";
import { Curso } from "../../entities/Curso";
import { Funcao } from "../../entities/Funcao";
import { Usuario } from "../../entities/Usuario";

type AgenteUpdateRequest = {
    id: string;
    usuario_id: string;
    curso_id: string;
    funcao_id: string;
};

export class UpdateAgenteService {
    async execute({
        id,
        usuario_id,
        curso_id,
        funcao_id,
    }: AgenteUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (usuario_id && !validate(id)) {
            return new Error("ID de usuário inválido");
        }

        if (usuario_id) {
            const repoUsuario = getRepository(Usuario);
            const usuario = await repoUsuario.findOne(usuario_id);
            if (!usuario) {
                return new Error("Usuário não existe!");
            }
        }

        if (curso_id && !validate(id)) {
            return new Error("ID de curso inválido");
        }

        if (curso_id) {
            const repoCurso = getRepository(Curso);
            const curso = await repoCurso.findOne(curso_id);
            if (!curso) {
                return new Error("Curso não existe!");
            }
        }

        if (funcao_id && !validate(id)) {
            return new Error("ID de usuário inválido");
        }

        if (funcao_id) {
            const repoFuncao = getRepository(Funcao);
            const funcao = await repoFuncao.findOne(funcao_id);
            if (!funcao) {
                return new Error("Função não existe!");
            }
        }

        const repo = getRepository(Agente);
        const agente = await repo.findOne(id);
        if (!agente) {
            return new Error("Agente não existe!");
        }

        agente.usuario_id = usuario_id ? usuario_id : agente.usuario_id;
        agente.curso_id = curso_id ? curso_id : agente.curso_id;
        agente.funcao_id = funcao_id ? funcao_id : agente.funcao_id;

        await repo.save(agente);

        return agente;
    }
}
