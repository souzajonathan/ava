import { getRepository } from "typeorm";
import { validate } from "uuid";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";

export class GetOneDisciplinaVersaoService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
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

        return versao;
    }
}
