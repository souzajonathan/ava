import { Request, Response } from "express";
import { GetOnePpcService } from "../../services/ppc/GetOnePpcService";

export class GetOnePpcController {
    async handle(request: Request, response: Response) {
        const service = new GetOnePpcService();

        const ppcs = await service.execute(request.query?.id as string);

        return response.json(ppcs);
    }
}