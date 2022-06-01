import { Request, Response } from "express";
import { CreateAutorService } from "../../services/autor/CreateAutorService";

export class CreateAutorController {
    async handle (request: Request, response: Response) {
        const {
            first_name,
            middle_name,
            last_name,
            quote,
            nationality
        } = request.body;

        const service = new CreateAutorService();

        const result = await service.execute({
            first_name,
            middle_name,
            last_name,
            quote,
            nationality
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}