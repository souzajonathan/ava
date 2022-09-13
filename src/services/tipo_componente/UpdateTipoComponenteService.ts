import { getRepository } from "typeorm";
import { validate } from "uuid";
import { TiposComponentes } from "../../entities/TiposComponentes";

type TipoComponenteUpdateRequest = {
    id: string;
    nome: string;
    descricao: string;
    carga_horaria: number;
};

export class UpdateTipoComponenteService {
    async execute({
        id,
        nome,
        descricao,
        carga_horaria,
    }: TipoComponenteUpdateRequest) {
        if (!validate(id)) {
            return new Error("ID inválido");
        }

        const repo = getRepository(TiposComponentes);
        const tipoComponente = await repo.findOne(id);
        if (!tipoComponente) {
            return new Error("Tipo de componente não existe!");
        }

        if (carga_horaria && isNaN(carga_horaria)) {
            return new Error("Insira um número válido em 'carga horária'");
        }

        tipoComponente.nome = nome ? nome : tipoComponente.nome;
        tipoComponente.descricao = descricao
            ? descricao
            : tipoComponente.descricao;
        tipoComponente.carga_horaria = carga_horaria
            ? carga_horaria
            : tipoComponente.carga_horaria;

        await repo.save(tipoComponente);

        return tipoComponente;
    }
}
