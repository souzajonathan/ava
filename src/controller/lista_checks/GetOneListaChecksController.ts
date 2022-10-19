import { Request, Response } from "express";
import { GetOneListaChecksService } from "../../services/lista_checks/GetOneListaChecksService";

export class GetOneListaChecksController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneListaChecksService();

        const lista = await service.execute(id);

        if (lista instanceof Error) {
            return response.status(400).json(lista.message);
        }

        return response.json(lista);
    }
}
