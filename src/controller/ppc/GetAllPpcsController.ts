import { Request, Response } from "express";
import { GetAllPpcsService } from "../../services/ppc/GetAllPpcsService";

export class GetAllPpcsController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPpcsService();

        const ppcs = await service.execute(request.query?.curso_id as string);

        return response.json(ppcs);
    }
}