import { getRepository } from "typeorm";
import { validate } from "uuid";
import { PerfisEgresso } from "../../entities/PerfisEgresso";

export class GetOnePerfilService {
    async execute(id: string, instituicao_id: string) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        const repo = getRepository(PerfisEgresso);

        const perfil = await repo
            .createQueryBuilder("perfil")
            .where({
                id: id,
            })
            .leftJoinAndSelect("perfil.ppc", "ppc")
            .leftJoinAndSelect(
                "ppc.ppcDisciplinaVersoes",
                "ppcDisciplinaVersoes"
            )
            .leftJoinAndSelect("ppcDisciplinaVersoes.versao", "versao")
            .getOne();

        if (!perfil) {
            return new Error("Perfil não existe!");
        }

        if (perfil.instituicao_id != instituicao_id) {
            return new Error("Essa instituição não contém esse perfil");
        }

        return perfil;
    }
}
