import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";
import { validate } from "uuid";

export class GetOnePpcService {
    async execute(id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(Ppc);

        /*const ppc = await repo.findOne(id, {
            relations: ["curso", "ppcDisciplinaVersoes", "perfis", "competencias"]
        });*/

        const ppc = await repo
            .createQueryBuilder("ppc")
            .where({
                id: id,
            })
            .leftJoinAndSelect(
                "ppc.ppcDisciplinaVersoes",
                "ppcDisciplinaVersoes"
            )
            .leftJoinAndSelect("ppcDisciplinaVersoes.versoes", "versoes")
            .leftJoin("versoes.disciplina", "disciplina")
            .addSelect(["disciplina.name"])
            .leftJoinAndSelect("ppc.curso", "curso")
            .leftJoinAndSelect("ppc.perfis", "perfis")
            .leftJoinAndSelect("ppc.competencias", "competencias")
            .getOne();

        if (!ppc) {
            return new Error("PPC não existe!");
        }

        return ppc;
    }
}
