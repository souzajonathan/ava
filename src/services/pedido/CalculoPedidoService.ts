import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

type PpcRequest = {
    dateLeft: string;
    dateRight: string;
}

export class CalculoPedidoService {
    async execute({ dateLeft, dateRight }: PpcRequest) {
''
        const repo = getRepository(Ppc);

        /* const ppcs = await repo.find({
            where: {dataInicio: (dateLeft)},
            relations: ["ppcDisciplinaVersoes"]
        }); */

        const ppcs = await repo.createQueryBuilder("ppc")
        .where({
            dataInicio: dateLeft
        })
        .leftJoinAndSelect("ppc.ppcDisciplinaVersoes", "ppcDisciplinaVersao")
        .leftJoinAndSelect("ppcDisciplinaVersao.versoes", "disciplinaVersao")
        .getMany();

        const startDate = new Date(dateLeft);
        const endDate = new Date(dateRight);
        /* const startDatePpc = dataInicioDoPpc

        const mesesI = startDate.getMonth() - startDatePpc.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
        const mesesF = endDate.getMonth() - startDatePpc.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())

        const moduloI = mesesI/3
        const moduloF = mesesF/3 */

        return ppcs;
    }
}