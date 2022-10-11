import { Request, Response } from "express";
import { CreateTipoServicoService } from "../../services/tipo_servico/CreateTipoServicoService";

export class CreateTipoServicoController {
    async handle(request: Request, response: Response) {
        const { nome, descricao, valor, unidade_medida, aprovacao } =
            request.body;

        const service = new CreateTipoServicoService();

        const result = await service.execute({
            nome,
            descricao,
            valor,
            unidade_medida,
            aprovacao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
