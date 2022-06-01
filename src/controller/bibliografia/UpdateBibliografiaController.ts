import { Request, Response } from "express";
import { UpdateBibliografiaService } from "../../services/bibliografia/UpdateBibliografiaService";

export class UpdateBibliografiaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { versao_disciplina_id, obra_id, tipo } = request.body;

        const service = new UpdateBibliografiaService();

        const result = await service.execute({id, versao_disciplina_id, obra_id, tipo});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}