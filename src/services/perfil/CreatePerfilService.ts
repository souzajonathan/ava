import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Instituicao } from "../../entities/Instituicao";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilRequest = {
    ppc_id: string;
    perfil: string;
    perfilNumero: number;
    instituicao_id: string;
};

export class CreatePerfilService {
    async execute({
        ppc_id,
        perfil,
        perfilNumero,
        instituicao_id,
    }: PerfilRequest) {
        if (!validate(ppc_id)) {
            return new Error("ID de PPC inválido");
        }

        if (!validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (!perfil) {
            return new Error("Perfil é obrigatório");
        }

        if (!Number.isInteger(perfilNumero)) {
            return new Error("Insira um número válido em 'número de perfil'");
        }

        const repoInstituicao = getRepository(Instituicao);
        const instituicao = await repoInstituicao.findOne(instituicao_id);
        if (!instituicao) {
            return new Error("Instituição não existe!");
        }

        const repo = getRepository(PerfisEgresso);
        const perfilAlreadyExists = await repo.findOne({
            perfilNumero,
            ppc_id,
        });
        if (perfilAlreadyExists) {
            return new Error("Número de perfil de egresso já existe");
        }

        const repoPpc = getRepository(Ppc);
        const ppc = await repoPpc.findOne(ppc_id);
        if (!ppc) {
            return new Error("Ppc não existe!");
        }

        const perfilEgresso = repo.create({
            ppc_id,
            perfil,
            perfilNumero,
            instituicao_id,
        });

        await repo.save(perfilEgresso);

        return {
            ...perfilEgresso,
            ppc,
        };
    }
}
