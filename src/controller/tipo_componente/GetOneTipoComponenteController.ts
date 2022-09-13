import { Request, Response } from "express";
import { GetOneTipoComponenteService } from "../../services/tipo_componente/GetOneTipoComponenteService";

export class GetOneTipoComponenteController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneTipoComponenteService();

        const tipo = await service.execute(id);

        if (tipo instanceof Error) {
            return response.status(400).json(tipo.message);
        }

        return response.json(tipo);
    }
}
