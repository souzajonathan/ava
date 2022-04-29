import { Request, Response } from "express";
import { UpdatePpcService } from "../../services/ppc/UpdatePpcService";

export class UpdatePpcController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres } = request.body;

        const service = new UpdatePpcService();

        const result = await service.execute({id, curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);
    }
}