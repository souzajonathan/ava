import { Request, Response } from "express";
import { UpdateAutorService } from "../../services/autor/UpdateAutorService";

export class UpdateAutorController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            first_name,
            middle_name,
            last_name,
            quote,
            nationality
        } = request.body;

        const service = new UpdateAutorService();

        const result = await service.execute({
            id,
            first_name,
            middle_name,
            last_name,
            quote,
            nationality
        });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}