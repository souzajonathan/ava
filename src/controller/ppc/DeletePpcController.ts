import { Request, Response } from "express";
import { DeletePpcService } from "../../services/ppc/DeletePpcService";

export class DeletePpcController {
    async handle (request: Request, response: Response) {
        const { id } = request.params;

        const service = new DeletePpcService();

        const result = await service.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.status(204).end();
    }
}