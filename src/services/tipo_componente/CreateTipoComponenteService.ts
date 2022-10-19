import { isInt, isNegative } from "class-validator";
import { getRepository } from "typeorm";
import { TiposComponentes } from "../../entities/TiposComponentes";

type TipoComponenteRequest = {
    nome: string;
    descricao: string;
    carga_horaria: number;
};

export class CreateTipoComponenteService {
    async execute({ nome, descricao, carga_horaria }: TipoComponenteRequest) {
        if (!nome) {
            return new Error("Tipo de componente não inserido");
        }

        if (!carga_horaria) {
            return new Error("Carga horária não inserida");
        }

        if (!isInt(carga_horaria) || isNegative(carga_horaria)) {
            return new Error("Insira um número válido em 'carga horária");
        }

        const repo = getRepository(TiposComponentes);
        const tipoComponente = repo.create({
            nome,
            descricao,
            carga_horaria,
        });

        await repo.save(tipoComponente);

        return tipoComponente;
    }
}
