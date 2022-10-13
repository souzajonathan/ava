import { Request, Response } from "express";
import { GetAllEntidadesService } from "../../services/entidade/GetAllEntidadesService";

export class GetAllEntidadesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllEntidadesService();

        const entidades = await service.execute(
            request.query?.entidade_id as string
        );

        return response.json(entidades);
    }
}
