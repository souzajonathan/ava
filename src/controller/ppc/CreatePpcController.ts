import { Request, Response } from "express";
import { CreatePpcService } from "../../services/ppc/CreatePpcService";

export class CreatePpcController {
    async handle (request: Request, response: Response) {
        const {curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres} = request.body;

        const service = new CreatePpcService();

        const result = await service.execute({
            curso_id,
            anoVoto,
            dataInicio,
            dataFim,
            horaCredito,
            quantSemestres
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}