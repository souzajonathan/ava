import { Request, Response } from "express";
import { UpdateServicoService } from "../../services/servico/UpdateServicoService";

export class UpdateServicoController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const {
            componente_pedido_versao_id,
            tipo_servico_id,
            observacao,
            posicao,
            em_andamento,
            aprovacao,
        } = request.body;

        const service = new UpdateServicoService();

        const result = await service.execute({
            id,
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
