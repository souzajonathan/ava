import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Agente } from "../../entities/Agente";
import { Curso } from "../../entities/Curso";
import { Funcao } from "../../entities/Funcao";
import { Usuario } from "../../entities/Usuario";

type AgenteRequest = {
    usuario_id: string;
    curso_id: string;
    funcao_id: string;
};

export class CreateAgenteService {
    async execute({ usuario_id, curso_id, funcao_id }: AgenteRequest) {
        if (!validate(usuario_id)) {
            return new Error("ID de usuário inválido");
        }

        if (!validate(curso_id)) {
            return new Error("ID de curso inválido");
        }

        if (!validate(funcao_id)) {
            return new Error("ID de função inválido");
        }

        const repoUsuario = getRepository(Usuario);
        const usuario = await repoUsuario.findOne(usuario_id);
        if (!usuario) {
            return new Error("Usuário não existe!");
        }

        const repoCurso = getRepository(Curso);
        const curso = await repoCurso.findOne(curso_id);
        if (!curso) {
            return new Error("Curso não existe!");
        }

        const repoFuncao = getRepository(Funcao);
        const funcao = await repoFuncao.findOne(funcao_id);
        if (!funcao) {
            return new Error("Função não existe!");
        }

        const repo = getRepository(Agente);

        const agente = repo.create({
            usuario_id,
            curso_id,
            funcao_id,
        });

        await repo.save(agente);

        return agente;
    }
}
