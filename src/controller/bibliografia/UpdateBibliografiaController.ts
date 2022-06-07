import { Request, Response } from "express";
import { UpdateBibliografiaService } from "../../services/bibliografia/UpdateBibliografiaService";

export class UpdateBibliografiaController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { disciplina_versao_id, obra_id, tipo } = request.body;

        const service = new UpdateBibliografiaService();

        const result = await service.execute({id, disciplina_versao_id, obra_id, tipo});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}