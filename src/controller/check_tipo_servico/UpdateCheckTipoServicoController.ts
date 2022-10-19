import { Request, Response } from "express";
import { UpdateCheckTipoComponenteService } from "../../services/check_tipo_servico/UpdateCheckTipoServicoService";

export class UpdateCheckTipoServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            tipo_componente_id,
            tipo_servico_id,
            check_servico,
            descricao,
            ativo,
        } = request.body;

        const service = new UpdateCheckTipoComponenteService();

        const result = await service.execute({
            id,
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
