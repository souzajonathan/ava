import { getRepository } from "typeorm";
import { DisciplinaVersao } from "../../entities/DisciplinaVersao";
import { Ppc } from "../../entities/Ppc";

type CalculoPedidoRequest = {
    dateLeft: string;
    dateRight: string;
    aux: string;
};

type DisciplinaPedido = DisciplinaVersao & {
    modulo: number;
};

export class CalculoPedidoService {
    async execute({ dateLeft, dateRight, aux }: CalculoPedidoRequest) {
        const repo = getRepository(Ppc);

        const ppcs = await repo
            .createQueryBuilder("ppc")
            .leftJoinAndSelect(
                "ppc.ppcDisciplinaVersoes",
                "ppcDisciplinaVersao"
            )
            .leftJoinAndSelect("ppcDisciplinaVersao.versao", "disciplinaVersao")
            .leftJoinAndSelect("disciplinaVersao.disciplina", "Disciplina")
            .leftJoinAndSelect("disciplinaVersao.pedidos", "Pedido")
            .getMany();

        const startDate = new Date(dateLeft);
        const endDate = new Date(dateRight);

        const disciplinasPedido: DisciplinaPedido[] = [];

        let filteredPpcs: Ppc[] = [];

        switch (aux) {
            case "todos": {
                filteredPpcs = ppcs;
                break;
            }
            case "tem pedidos": {
                filteredPpcs = ppcs.filter((ppc) => {
                    return ppc.ppcDisciplinaVersoes.some((pdv) => {
                        return pdv.versao.pedidos.length > 0;
                    });
                });
                break;
            }
            case "nao tem pedidos": {
                filteredPpcs = ppcs.filter((ppc) => {
                    return ppc.ppcDisciplinaVersoes.some((pdv) => {
                        return pdv.versao.pedidos.length === 0;
                    });
                });
                break;
            }
            default:
        }

        filteredPpcs.forEach((ppc) => {
            const startDatePpc = new Date(ppc.dataInicio);

            const mesesI =
                startDate.getMonth() -
                startDatePpc.getMonth() +
                12 * (startDate.getFullYear() - startDatePpc.getFullYear());
            const mesesF =
                endDate.getMonth() -
                startDatePpc.getMonth() +
                12 * (endDate.getFullYear() - startDatePpc.getFullYear());

            const moduloI = mesesI / 3;
            const moduloF = mesesF / 3;

            ppc.ppcDisciplinaVersoes.forEach((versao) => {
                if (versao.modulo <= moduloF && versao.modulo >= moduloI) {
                    disciplinasPedido.push({
                        ...versao.versao,
                        modulo: versao.modulo,
                    });
                }
            });
        });

        return disciplinasPedido;
    }
}
