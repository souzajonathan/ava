import { Request, Response } from "express";
import { GetOnePpcService } from "../../services/ppc/GetOnePpcService";

export class GetOnePpcController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOnePpcService();

        const ppc = await service.execute(id);

        return response.json(ppc);
    }
}