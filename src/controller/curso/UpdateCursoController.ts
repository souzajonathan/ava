import { Request, Response } from "express";
import { UpdateCursoService } from "../../services/curso/UpdateCursoService";

export class UpdateCursoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, pccAtivo } = request.body;

        const service = new UpdateCursoService();

        const result = await service.execute({id, name, pccAtivo});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}