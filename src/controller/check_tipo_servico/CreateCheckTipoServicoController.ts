import { Request, Response } from "express";
import { CreateCheckTipoServicoService } from "../../services/check_tipo_servico/CreateCheckTipoServicoService";

export class CreateCheckTipoServicoController {
    async handle(request: Request, response: Response) {
        const {
            tipo_componente_id,
            tipo_servico_id,
            check_servico,
            descricao,
            ativo,
        } = request.body;

        const service = new CreateCheckTipoServicoService();

        const result = await service.execute({
            tipo_componente_id,
            tipo_servico_id,
            check_servico,
            descricao,
            ativo,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
