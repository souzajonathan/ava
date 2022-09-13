import { Request, Response } from "express";
import { CreateBibliografiaService } from "../../services/bibliografia/CreateBibliografiaService";

export class CreateBibliografiaController {
    async handle(request: Request, response: Response) {
        const { disciplina_versao_id, obra_id, tipo } = request.body;

        const service = new CreateBibliografiaService();

        const result = await service.execute({
            disciplina_versao_id,
            obra_id,
            tipo,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
