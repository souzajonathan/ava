import { isPositive } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "uuid";
import { Instituicao } from "../../entities/Instituicao";
import { PerfisEgresso } from "../../entities/PerfisEgresso";
import { Ppc } from "../../entities/Ppc";

type PerfilUpdateRequest = {
    id: string;
    ppc_id: string;
    perfil: string;
    perfilNumero: number;
    instituicao_id: string;
};

export class UpdatePerfilService {
    async execute({
        id,
        ppc_id,
        perfil,
        perfilNumero,
        instituicao_id,
    }: PerfilUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        if (instituicao_id && !validate(instituicao_id)) {
            return new Error("ID de instituição inválido");
        }

        if (instituicao_id) {
            const repoInstituicao = getRepository(Instituicao);
            const instituicao = await repoInstituicao.findOne(instituicao_id);
            if (!instituicao) {
                return new Error("Instituição não existe!");
            }
        }

        if (ppc_id && !validate(ppc_id)) {
            return new Error("ID de PPC inválido");
        }

        if (perfilNumero && !isPositive(perfilNumero)) {
            return new Error("Insira um número válido em número de perfil");
        }

        const repo = getRepository(PerfisEgresso);
        const perfilEgresso = await repo.findOne(id);
        if (!perfilEgresso) {
            return new Error("Perfil não existente!");
        }

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

        perfilEgresso.ppc_id = ppc_id ? ppc_id : perfilEgresso.ppc_id;
        perfilEgresso.perfil = perfil ? perfil : perfilEgresso.perfil;
        perfilEgresso.perfilNumero = perfilNumero
            ? perfilNumero
            : perfilEgresso.perfilNumero;
        perfilEgresso.instituicao_id = instituicao_id
            ? instituicao_id
            : perfilEgresso.instituicao_id;

        await repo.save(perfilEgresso);

        return {
            ...perfilEgresso,
            ppc,
        };
    }
}
