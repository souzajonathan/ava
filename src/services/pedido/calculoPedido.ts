import { getRepository } from "typeorm";
import { Ppc } from "../../entities/Ppc";

type PpcRequest = {
    id: string;
    dataLeft: string;
    dataRight: string;
}

export class CalculoPedido {
    async execute({ id, dataLeft, dataRight }: PpcRequest): Promise<Ppc | Error> {
        const repo = getRepository(Ppc);

        const ppc = await repo.findOne(id);

        const inicioData = new Date(ppc.dataInicio);
        const dataA = new Date(dataLeft);

            /* dateTo.getMonth() -
            dateFrom.getMonth() +
            12 * (dateTo.getFullYear() - dateFrom.getFullYear()) */

        return ppc;
    }
}