import { getRepository, getConnection } from "typeorm";
import { Instituicao } from "../../entities/Instituicao";

type InstituicaoRequest = {
    name: string;
    sigla: string;
    link: string;
    description: string;
    padrao: boolean;
};

export class CreateInstituicaoService {
    async execute({
        name,
        sigla,
        link,
        description,
        padrao,
    }: InstituicaoRequest) {
        if (!name) {
            return new Error("Nome de instituição não inserido");
        }

        if (!sigla) {
            return new Error("Sigla de instituição não inserido");
        }

        if (!link) {
            return new Error("Link de instituição não inserido");
        }

        if (typeof padrao != "boolean") {
            return new Error("Marcação de tipo de instituição inválida");
        }

        const repo = getRepository(Instituicao);

        const siglaAlreadyExists = await repo.findOne({ sigla });
        if (siglaAlreadyExists) {
            return new Error("Sigla de instituição já existe");
        }

        const pesquisa = await repo.findOne({ padrao: true });

        if (!padrao) {
            if (!pesquisa) {
                padrao = true;
            } else {
                padrao = false;
            }
        } else {
            if (pesquisa) {
                pesquisa.padrao = false;
            }
        }

        const connection = getConnection();

        const instituicao = repo.create({
            name,
            sigla,
            link,
            description,
            padrao,
        });

        connection.transaction(async (manager) => {
            const repom = manager.getRepository(Instituicao);

            await repom.save(pesquisa);

            await repom.save(instituicao);
        });

        return instituicao;
    }
}
