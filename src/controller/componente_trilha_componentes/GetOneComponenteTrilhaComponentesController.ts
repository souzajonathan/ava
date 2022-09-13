import { Request, Response } from "express";
import { GetOneComponenteTrilhaComponentesService } from "../../services/componente_trilha_componente/GetOneComponenteTrilhaComponentes";

export class GetOneComponenteTrilhaComponentesController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOneComponenteTrilhaComponentesService();

        const componenteTrilhaComponentes = await service.execute(id);

        if (componenteTrilhaComponentes instanceof Error) {
            return response
                .status(400)
                .json(componenteTrilhaComponentes.message);
        }

        return response.json(componenteTrilhaComponentes);
    }
}
