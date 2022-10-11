import { Request, Response } from "express";
import { CreateServicoService } from "../../services/servico/CreateServicoService";

export class CreateServicoController {
    async handle(request: Request, response: Response) {
        const {
            componente_pedido_versao_id,
            tipo_servico_id,
            observacao,
            posicao,
            em_andamento,
            aprovacao,
        } = request.body;

        const service = new CreateServicoService();

        const result = await service.execute({
            componente_pedido_versao_id,
            tipo_servico_id,
            observacao,
            posicao,
            em_andamento,
            aprovacao,
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
