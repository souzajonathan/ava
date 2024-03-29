import { getRepository } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetOneDisciplinaVersaoService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(DisciplinaVersao);

        const versao = await repo
            .createQueryBuilder("versao")
            .where({
                id: id,
            })
            .leftJoinAndSelect("versao.disciplina", "disciplina")
            .leftJoinAndSelect("versao.bibliografias", "bibliografias")
            .leftJoinAndSelect(
                "versao.ppcDisciplinaVersoes",
                "ppcDisciplinaVersoes"
            )
            .leftJoinAndSelect("ppcDisciplinaVersoes.ppc", "ppc")
            .leftJoinAndSelect("ppc.competencias", "competencias")
            .leftJoinAndSelect("ppc.perfis", "perfis")
            .leftJoinAndSelect("ppc.curso", "curso")
            .getOne();

        /* .findOne(id, {
            relations: [
                "disciplina",
                "ppcDisciplinaVersoes.ppc",
                "bibliografias",
            ],
        });
 */

        if (!versao) {
            return new Error("Versão de disciplina não existe!");
        }

        if (versao.instituicao_id != instituicao_id) {
            return new Error(
                "Essa instituição não contém essa versão de disciplina"
            );
        }

        return versao;
    }
}
