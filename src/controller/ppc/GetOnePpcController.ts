import { Request, Response } from "express";
import { GetOnePpcService } from "../../services/ppc/GetOnePpcService";

export class GetOnePpcController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const service = new GetOnePpcService();

        const ppc = await service.execute(
            id,
            request.query.instituicao_id as string
        );

        if (ppc instanceof Error) {
            return response.status(400).json(ppc.message);
        }

        return response.json(ppc);
    }
}
