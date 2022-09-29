import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Instituicao } from "../../entities/Instituicao";

type InstituicaoUpdateRequest = {
    id: string;
    name: string;
    sigla: string;
    link: string;
    inst_default: boolean;
};

export class UpdateInstituicaoService {
    async execute({
        id,
        name,
        sigla,
        link,
        inst_default,
    }: InstituicaoUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (inst_default && typeof inst_default != "boolean") {
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
        instituicao.link = link ? link : instituicao.link;
        if (inst_default != undefined && inst_default != null) {
            instituicao.inst_default = inst_default;
        }

        await repo.save(instituicao);

        return instituicao;
    }
}
