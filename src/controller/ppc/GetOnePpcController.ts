import { Request, Response } from "express";
import { GetOnePpcService } from "../../services/ppc/GetOnePpcService";

export class GetOnePpcController {
    async handle(request: Request, response: Response) {
        const service = new GetOnePpcService();

        const ppc = await service.execute(request.query?.id as string);

        return response.json(ppc);
    }
}