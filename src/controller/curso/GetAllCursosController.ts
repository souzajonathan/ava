import { Request, Response } from "express";
import { GetAllCursosService } from "../../services/curso/GetAllCursosService";

export class GetAllCursosController {
    async handle(request: Request, response: Response) {
        const service = new GetAllCursosService();

        const cursos = await service.execute(
            request.query,
            request.query?.instituicao_id as string
        );

        return response.json(cursos);
    }
}
