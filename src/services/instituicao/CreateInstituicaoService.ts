import { getRepository } from "typeorm";
import { Instituicao } from "../../entities/Instituicao";

type InstituicaoRequest = {
    name: string;
    sigla: string;
    link: string;
    inst_default: boolean;
};

export class CreateInstituicaoService {
    async execute({ name, sigla, link, inst_default }: InstituicaoRequest) {
        if (!name) {
            return new Error("Nome de instituição não inserido");
        }

        if (!sigla) {
            return new Error("Sigla de instituição não inserido");
        }

        if (!link) {
            return new Error("Link de instituição não inserido");
        }

        if (typeof inst_default != "boolean") {
            return new Error("Marcação de tipo de instituição inválida");
        }

        const repo = getRepository(Instituicao);

        const siglaAlreadyExists = await repo.findOne({ sigla });
        if (siglaAlreadyExists) {
            return new Error("Sigla de instituição já existe");
        }

        const instituicao = repo.create({
            name,
            sigla,
            link,
            inst_default,
        });

        await repo.save(instituicao);

        return instituicao;
    }
}
