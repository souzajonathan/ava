import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Instituicao } from "../../entities/Instituicao";

type InstituicaoUpdateRequest = {
    id: string;
    name: string;
    sigla: string;
    description: string;
    link: string;
    padrao: boolean;
};

export class UpdateInstituicaoService {
    async execute({
        id,
        name,
        sigla,
        description,
        link,
        padrao,
    }: InstituicaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (padrao && typeof padrao != "boolean") {
            return new Error("Marcação para 'instituição default' inválida");
        }

        const repo = getRepository(Instituicao);
        const instituicao = await repo.findOne(id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const siglaAlreadyExists = await repo.findOne({
            where: { sigla },
        });

        if (
            siglaAlreadyExists &&
            siglaAlreadyExists.sigla != instituicao.sigla
        ) {
            return new Error("Sigla já existe!");
        }

        instituicao.name = name ? name : instituicao.name;
        instituicao.sigla = sigla ? sigla : instituicao.sigla;
        instituicao.description = description
            ? description
            : instituicao.description;
        instituicao.link = link ? link : instituicao.link;
        if (padrao != undefined && padrao != null) {
            instituicao.padrao = padrao;
        }

        await repo.save(instituicao);

        return instituicao;
    }
}
